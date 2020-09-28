module.exports = {
  configurations: {
    "android.emu.debug": {
      binaryPath: "android/app/build/outputs/apk/debug/app-debug.apk",
      build: "cd android && ./gradlew app:assembleDebug assembleAndroidTest -DtestBuildType=debug && cd ..",
      type: "android.emulator",
      device: {
        avdName: "Pixel_3_API_27",
      },
    },
    "android.emu.release": {
      binaryPath: "android/app/build/outputs/apk/release/app-release.apk",
      build: "cd android && ./gradlew app:assembleRelease assembleAndroidTest -DtestBuildType=release && cd ..",
      type: "android.emulator",
      device: {
        avdName: "Pixel_3_API_27",
      },
    },
    "android": {
      binaryPath: "android/app/build/outputs/apk/release/app-release.apk",
      build: "cd android && ./gradlew app:assembleRelease assembleAndroidTest -DtestBuildType=release && cd ..",
      type: "android.emulator",
      device: {
        avdName: "Pixel_3_API_27",
      },
    },
    "ios.sim.release": {
      binaryPath: "ios/build/Build/Products/Release-iphonesimulator/mobileApp.app",
      build: "xcodebuild -workspace ios/mobileApp.xcworkspace -scheme mobileApp -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build",
      type: "ios.simulator",
      device: {
        type: "iPhone 11 Pro",
      },
    },
    "ios.sim.debug": {
      binaryPath: "ios/build/Build/Products/Debug-iphonesimulator/mobileApp.app",
      build: "xcodebuild -workspace ios/mobileApp.xcworkspace -scheme mobileApp -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build",
      type: "ios.simulator",
      device: {
        type: "iPhone 11 Pro",
      },
    },
    "ios": {
      binaryPath: "ios/build/Build/Products/Debug-iphonesimulator/mobileApp.app",
      build: "xcodebuild -workspace ios/mobileApp.xcworkspace -scheme mobileApp -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build",
      type: "ios.simulator",
      device: {
        type: "iPhone 11 Pro",
      },
    },
  },
  "testRunner": "jest",
  "runnerConfig": process.env.DETOX_EXPOSE_GLOBALS === '0' ? 'e2eExplicitRequire/config.json' : 'e2e/config.json',
  "specs": process.env.DETOX_EXPOSE_GLOBALS === '0' ? 'e2eExplicitRequire' : 'e2e',
  "behavior": {
    "init": {
      "exposeGlobals": process.env.DETOX_EXPOSE_GLOBALS !== '0',
    },
  },

};
