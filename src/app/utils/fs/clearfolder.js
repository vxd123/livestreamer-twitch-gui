import denodify from "utils/denodify";
import stat from "utils/fs/stat";
import PATH from "commonjs!path";
import FS from "commonjs!fs";


var fsReaddir = denodify( FS.readdir );
var fsUnlink  = denodify( FS.unlink );


function execBatchAndIgnoreRejected( list, fn ) {
	// additional fn arguments
	var args = [].slice.call( arguments, 2 );

	// wait for all promises to resolve
	return Promise.all( list.map(function( elem ) {
		// do something with a list element
		return fn.apply( null, [ elem ].concat( args ) )
			// always resolve
			.catch(function() { return null; });
	}) )
		// filter out elems that "didn't resolve"
		.then(function( list ) {
			return list.filter(function( elem ) {
				return elem !== null;
			});
		});
}


export default function clearfolder( dir, threshold ) {
	return fsReaddir( dir )
		.then(function( files ) {
			// prepend dir path
			files = files.map(function( file ) {
				return PATH.join( dir, file );
			});

			// just return all files if there is no threshold set
			if ( !threshold ) { return files; }

			// ignore all files newer than X
			var now = new Date();
			return execBatchAndIgnoreRejected( files, stat, function( stat ) {
				return stat.isFile()
					&& now - stat.mtime > threshold;
			});
		})
		// delete all matched files
		.then(function( files ) {
			return execBatchAndIgnoreRejected( files, fsUnlink );
		});
}
