http_archive(
    name = "build_bazel_rules_apple",
    strip_prefix = "rules_apple-0.7.0",
    urls = ["https://github.com/bazelbuild/rules_apple/archive/0.7.0.tar.gz"], # 2018-08-15
)

load("@build_bazel_rules_apple//apple:repositories.bzl", "apple_rules_dependencies")

apple_rules_dependencies()

http_archive(
    name = "io_bazel_rules_appengine",
    sha256 = "d1fbc9a48332cc00b56d66751b5eb911ac9a88e820af7a2316a9b5ed4ee46d0b",
    strip_prefix = "rules_appengine-0.0.7",
    url = "https://github.com/bazelbuild/rules_appengine/archive/0.0.7.tar.gz",
)

load("@io_bazel_rules_appengine//appengine:appengine.bzl", "appengine_repositories")

appengine_repositories()

android_sdk_repository(
    name = "androidsdk",
    # TODO: set with env variable $ANDROID_HOME
    path = "/Users/vladimirov/Library/Android/sdk",
)
android_ndk_repository(
    name = "androidndk", # Required. Name *must* be "androidndk".
    path = "/Users/vladimirov/Library/Android/sdk/ndk-bundle", # Optional. Can be omitted if `ANDROID_NDK_HOME` environment variable is set.
)

new_http_archive(
    name = "tns_widgets",
    url = "https://registry.yarnpkg.com/tns-core-modules-widgets/-/tns-core-modules-widgets-4.2.0.tgz",
    strip_prefix = "package/platforms",
    build_file_content = """package(default_visibility=["//visibility:public"])
aar_import(
    name = "nativescript-widgets",
    aar = "android/widgets-release.aar",
)
    """,
)
new_http_archive(
    name = "tns_android",
    url = "https://registry.yarnpkg.com/tns-android/-/tns-android-4.2.0.tgz",
    strip_prefix = "package/framework",
    build_file_content = """package(default_visibility=["//visibility:public"])

exports_files([
    "build-tools/android-metadata-generator.jar",
    "build-tools/static-binding-generator.jar",
    "build-tools/jsparser/js_parser.js",
])

filegroup(
    name = "static_binding_java",
    srcs = glob([
       "app/src/main/java/com/tns/*.java",
       "app/src/main/java/com/tns/internal/*.java",
    ]),
)

aar_import(
    name = "nativescript-optimized-with-inspector",
    aar = "app/libs/runtime-libs/nativescript-optimized-with-inspector.aar",
)
""",
)

bind(
    name = "android_sdk_for_testing",
    actual = "@androidsdk//:files",
)

GMAVEN_TAG = "20181010-1" # or the tag from the latest release

http_archive(
    name = "gmaven_rules",
    strip_prefix = "gmaven_rules-%s" % GMAVEN_TAG,
    url = "https://github.com/bazelbuild/gmaven_rules/archive/%s.tar.gz" % GMAVEN_TAG,
)

load("@gmaven_rules//:gmaven.bzl", "gmaven_rules")

gmaven_rules()

git_repository(
    name = "build_bazel_rules_nodejs",
    remote = "https://github.com/bazelbuild/rules_nodejs.git",
    tag = "0.15.3",
)

load("@build_bazel_rules_nodejs//:defs.bzl", "node_repositories")
node_repositories()
