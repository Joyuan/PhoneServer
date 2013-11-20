package com.joyuan.phoneserver;

import android.content.Context;
import android.content.res.AssetManager;
import android.os.Environment;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

public class CopyUtil {

    private AssetManager manager;

    public CopyUtil(Context context) {
        manager = context.getAssets();
    }

    public boolean assetsCopy() {
        try {
            assetsCopy("joyuan", Environment.getExternalStorageDirectory()
                    + "/.joyuan"); // assets内.ds文件找不到==
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    public void assetsCopy(String assetsPath, String dirPath)
            throws IOException {
        String[] list = manager.list(assetsPath);
        if (list.length == 0) { // 文件
            InputStream in = manager.open(assetsPath);
            File file = new File(dirPath);
            file.getParentFile().mkdirs();
            file.createNewFile();
            FileOutputStream fout = new FileOutputStream(file);
            /* 复制 */
            byte[] buf = new byte[1024];
            int count;
            while ((count = in.read(buf)) != -1) {
                fout.write(buf, 0, count);
                fout.flush();
            }
            /* 关闭 */
            in.close();
            fout.close();
        } else { // 目录
            for (String path : list) {
                assetsCopy(assetsPath + "/" + path, dirPath + "/" + path);
            }
        }
    }

}
