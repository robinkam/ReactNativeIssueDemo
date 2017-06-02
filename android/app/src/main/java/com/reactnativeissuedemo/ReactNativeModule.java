package com.reactnativeissuedemo;

import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;


public class ReactNativeModule extends ReactContextBaseJavaModule {
    protected static final String LOG_TAG = "ReactNativeAndroid";
    public ReactNativeModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "NativeModule";
    }

    @ReactMethod
    public void loadData(String url, Promise promise) {
        Log.v(LOG_TAG, "ReactNativeModule.loadData() invoked on Android side");
        promise.resolve("loadData on Android succeeded");
    }

    @ReactMethod
    public void handleEvent(ReadableMap event) {
        Log.v(LOG_TAG, "ReactNativeModule.handleEvent() invoked on Android side ");
        Toast.makeText(getReactApplicationContext(), "ReactNativeModule.handleEvent() invoked on Android side", Toast.LENGTH_SHORT).show();
    }
}
