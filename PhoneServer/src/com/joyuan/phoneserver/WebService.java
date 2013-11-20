package com.joyuan.phoneserver;

import android.app.Service;
import android.content.Intent;
import android.os.IBinder;

/**
 * Created with IntelliJ IDEA.
 * User: Joyuan
 * Date: 12-10-17
 * Time: 上午10:14
 * To change this template use File | Settings | File Templates.
 */
public class WebService extends Service {
    private Server mServer;


    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onCreate() {
        super.onCreate();
    }

    @Override
    public void onStart(Intent intent, int startId) {
        super.onStart(intent, startId);
        try {
            mServer = new Server(getApplicationContext());

            //startForeground(0x1982, notification);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        mServer.stop();
    }

}
