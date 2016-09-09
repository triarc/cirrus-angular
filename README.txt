
# Publish package

On your first publish you have to log in first 
as the triarc user (credentials are in the keystore)

npm login 

Now you can publish your package, which requires a 
package.json in the root of the directory.

gulp publish --package {directory} --bump {version bump type}


Example:

gulp publish --package input-control --bump patch