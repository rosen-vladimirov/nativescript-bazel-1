const path = require('path');

const ensureCorrectBazelFileExist = ($fs, $logger, bazelFileExpectedLocation, baseBazelFile) => {
	if ($fs.exists(bazelFileExpectedLocation)) {
		const content = $fs.readText(bazelFileExpectedLocation);
		const expectedContent = $fs.readText(baseBazelFile);
		if (content !== expectedContent) {
			$logger.warn(`Files ${bazelFileExpectedLocation} and ${baseBazelFile} differ. Bazel build may not work as expected`);
		}
	} else {
		$fs.copyFile(baseBazelFile, bazelFileExpectedLocation);
	}
};

const originalBazelFilesDir = path.join(__dirname, "bazel-files");

module.exports = function ($logger, $fs, hookArgs) {
	const projectData = hookArgs.projectData;
	const projectDir = projectData.projectDir;
	const pathToProjectWorkspace = path.join(projectDir, "WORKSPACE");
	const originalWorkspaceFile = path.join(originalBazelFilesDir, "WORKSPACE");
	ensureCorrectBazelFileExist($fs, $logger, pathToProjectWorkspace, originalWorkspaceFile);

	const platformsDirPath = path.join(projectDir, "platforms");
	const pathToPlatformsBuildFile = path.join(platformsDirPath, "BUILD");
	const originalPlatformsBuildFile = path.join(originalBazelFilesDir, "BUILD_platforms_dir");
	ensureCorrectBazelFileExist($fs, $logger, pathToPlatformsBuildFile, originalPlatformsBuildFile);

	const pathToAndroidBuildFile = path.join(platformsDirPath, "android", "BUILD");
	const originalAndroidBuildFile = path.join(originalBazelFilesDir, "BUILD_android_dir");
	ensureCorrectBazelFileExist($fs, $logger, pathToAndroidBuildFile, originalAndroidBuildFile);
}
