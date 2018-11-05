# Build NativeScript project with Bazel

This repository contains a NativeScript project and all required files to build it with Bazel.
The desired workflow of this POC is:
1. `tns create <name>`
2. `tns prepare android`
3. Copy required `WORKSPACE`, `BUILD`, `nativescript.bzl`, `sbg.sh` and `mdg.sh` files.
4. `bazel run platforms//android:android`

As you can see, there is a `WORKSPACE` file at the top of the project. All of the required files are under platforms dir.