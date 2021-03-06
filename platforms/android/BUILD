load("@gmaven_rules//:defs.bzl", "gmaven_artifact")
load(":nativescript.bzl", "static_binding_generator", "android_metadata_generator")

genrule(
    name = "modified_jsparser.js",
    srcs = ["@tns_android//:build-tools/jsparser/js_parser.js"],
    outs = ["js_parser.js"],
    cmd = "sed 's#$${__dirname}/..#$${process.cwd()}#' $< > $@",
)

sh_binary(
    name = "sbg_sh",
    srcs = ["sbg.sh"],
)

sh_binary(
    name = "mdg_sh",
    srcs = ["mdg.sh"],
)

# assets are the contents of app dir and the contents of node_modules
ASSETS = glob([
        "app/src/main/assets/**",
    ],
    exclude=[
        "app/src/main/assets/**/*.ts",
        "app/src/main/assets/**/*.js.map",
        "app/src/main/assets/**/*.metadata.json",
        "app/src/main/assets/app/tns_modules/rxjs/_esm5/**",
        "app/src/main/assets/app/tns_modules/rxjs/_esm2015/**",
        "app/src/main/assets/app/tns_modules/@angular/*/esm2015/**",
        "app/src/main/assets/app/tns_modules/@angular/*/esm5/**",
        "app/src/main/assets/app/tns_modules/@angular/common/locales/**",
    ],
)

DEPS = [
    "@tns_android//:nativescript-optimized-with-inspector",
    "@tns_widgets//:nativescript-widgets",
    gmaven_artifact("com.android.support:multidex:aar:1.0.2"),
    gmaven_artifact("com.android.support:support-annotations:jar:26.0.0-alpha1"),
] + [
    gmaven_artifact("com.android.support:%s:aar:26.0.0" % support_lib)
    for support_lib in [
        "design",
        "appcompat-v7",
        "transition",
        "support-v4",
        "support-media-compat",
        "support-fragment",
        "support-core-utils",
        "recyclerview-v7",
        "support-core-ui",
        "animated-vector-drawable",
        "support-vector-drawable",
        "support-compat",
    ]
]

static_binding_generator(
    name = "static_bindings",
    deps = DEPS + ["@androidsdk//:platforms/android-28/android.jar"],
    assets = ASSETS,
    # NB: assets_dir here needs to include the "/app" segment which doesn't appear
    # on the android_binary rule below
    assets_dir = "app/src/main/assets/app",
)

android_library(
    name = "compiled_static_bindings",
    srcs = [
      "@tns_android//:static_binding_java",
      ":static_bindings",
    ],
    deps = DEPS,
)

# The final binary rule, which builds the APK and sets the application manifest,
# as well as any other resources needed by the application.
# The package for the R class for resources is normally inferred from the
# directory containing the BUILD file, but this BUILD file is not under a java
# directory, so we specify it manually.
android_library(
    name = "android_lib",
    custom_package = "com.google.bazel.example.android",
    srcs = [],
    manifest = "app/src/main/AndroidManifest.xml",
    resource_files = glob(["app/src/main/res/**"]),
    visibility = ["//visibility:public"],
    assets = ASSETS,
    assets_dir = "app/src/main/assets",
    deps = DEPS + [":compiled_static_bindings"],
)

android_metadata_generator(
    name = "generated_metadata",
    resource_jar = ":android_lib_resources.jar",
    deps = DEPS + ["@androidsdk//:platforms/android-28/android.jar"],
)

android_binary(
    name = "android",
    manifest = "app/src/main/AndroidManifest.xml",
    custom_package = "com.google.bazel.example.android",
    assets = ASSETS + [
        ":generated_metadata",
    ],
    assets_dir = "app/src/main/assets",
    srcs = [],
    resource_files = glob(["app/src/main/res/**"]),
    visibility = ["//visibility:public"],
    deps = DEPS + [
        ":compiled_static_bindings",
        ":android_lib",
    ],
)
