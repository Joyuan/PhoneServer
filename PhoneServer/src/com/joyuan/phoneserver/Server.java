package com.joyuan.phoneserver;

import android.content.Context;

import java.io.File;
import java.io.IOException;
import java.util.Properties;

public class Server extends NanoHTTPD {
    private Context mContext;

    public Server(Context context) throws IOException {
        super(8888, new File("."));
        mContext = context;
    }

    public Response serve(String uri, String method, Properties header, Properties parms, Properties files) {
/*        try {
            if (uri.equals("/")) {
                InputStream inputStream = mContext.getAssets().open("index.html");
                return new Response(NanoHTTPD.HTTP_OK, NanoHTTPD.MIME_HTML, inputStream);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }*/
        return super.serve(uri, method, header, parms, files);
    }

    @Override
    public void stop() {
        super.stop();    //To change body of overridden methods use File | Settings | File Templates.
    }
}
