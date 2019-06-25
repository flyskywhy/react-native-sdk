package io.textile.rnmobile;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

import io.textile.textile.Handlers;
import io.textile.textile.Textile;

public class IpfsBridge extends ReactContextBaseJavaModule {

    private Executor executor = Executors.newSingleThreadExecutor();

    public IpfsBridge(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "IpfsBridge";
    }

    @ReactMethod
    public void peerId(final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    promise.resolve(Textile.instance().ipfs.peerId());
                }
                catch (final Exception e) {
                    promise.reject("peerId", e);
                }
            }
        });
    }

    @ReactMethod
    public void dataAtPath(final String path, final Promise promise) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                Textile.instance().ipfs.dataAtPath(path, new Handlers.DataHandler() {
                    @Override
                    public void onComplete(final byte[] data, final String media) {
                        promise.resolve(Util.encodeData(data, media));
                    }

                    @Override
                    public void onError(final Exception e) {
                        promise.reject("dataAtPath", e);
                    }
                });
            }
        });
    }
}
