package com.joyuan.phoneserver;

import android.app.Activity;
import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.text.TextUtils;
import android.view.KeyEvent;
import android.widget.CompoundButton;
import android.widget.TextView;
import android.widget.ToggleButton;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.util.Enumeration;
import org.apache.http.conn.util.InetAddressUtils;

public class MainActivity extends Activity implements
		CompoundButton.OnCheckedChangeListener {

	private Server mServer;
	private static final int COPY_FINIDH = 100;
	private ToggleButton toggleBtn;
	private TextView urlText;
	private Notification notification = null;
	private NotificationManager mNM = null;
	private Intent intent;
	private Handler handler = new Handler() {
		public void handleMessage(Message msg) {
			switch (msg.what) {
			case COPY_FINIDH:
				try {
					// mServer=new Server(MainActivity.this);
				} catch (Exception e) {
					e.printStackTrace();
				}
				break;
			}
		}
	};

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main);
		initViews();
		initNoti();
		CopyUtil copyUtil = new CopyUtil(this);
		copyUtil.assetsCopy();
		Message msg = Message.obtain();
		msg.what = COPY_FINIDH;
		handler.sendMessage(msg);
		intent = new Intent(this, WebService.class);
	}

	private void initViews() {
		toggleBtn = (ToggleButton) findViewById(R.id.toggleBtn);
		toggleBtn.setOnCheckedChangeListener(this);
		urlText = (TextView) findViewById(R.id.urlText);
	}

	@Override
	public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
		if (isChecked) {
			String ip = getLocalIpAddress();
			if (ip == null) {
				urlText.setText("请检查wifi连接");
			} else {
				startService(intent);
				urlText.setText("http://" + ip + ":8888/");
				mNM.notify(0, notification);
			}
		} else {
			mNM = (NotificationManager) MainActivity.this
					.getSystemService(Context.NOTIFICATION_SERVICE);
			mNM.cancelAll();
			stopService(intent);
			urlText.setText("");
		}
	}

	private void initNoti() {
		mNM = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
		int icon = R.drawable.logo;
		CharSequence tickerText = getString(R.string.app_name);
		long when = System.currentTimeMillis();
		notification = new Notification(icon, tickerText, when);
		CharSequence contentTitle = getString(R.string.app_name);
		CharSequence contentText = getString(R.string.start);
		Intent notificationIntent = new Intent(this, MainActivity.class);
		PendingIntent contentIntent = PendingIntent.getActivity(this, 0,
				notificationIntent, 0);
		notification.setLatestEventInfo(getApplicationContext(), contentTitle,
				contentText, contentIntent);
		// notification.flags |= Notification.FLAG_ONGOING_EVENT;
	}

	private String getLocalIpAddress() {
		String ipInfo = null;

		try {
			Enumeration<NetworkInterface> faces = NetworkInterface
					.getNetworkInterfaces();

			LOOP: while (faces.hasMoreElements()) {
				Enumeration<InetAddress> addresses = faces.nextElement()
						.getInetAddresses();

				while (addresses.hasMoreElements()) {
					InetAddress inetAddress = addresses.nextElement();

					if (!inetAddress.isLoopbackAddress()
							&& InetAddressUtils
									.isIPv4Address(ipInfo = inetAddress
											.getHostAddress())) {
						ipInfo = inetAddress.getHostAddress().toString();

						break LOOP;
					}
				}
			}

		} catch (Exception e) {
		}

		if (TextUtils.isEmpty(ipInfo)) {
			ipInfo = "";
		}

		return ipInfo;
	}

	public boolean onKeyDown(int keyCode, KeyEvent event) {
		if (keyCode == KeyEvent.KEYCODE_BACK) {
			Intent intent = new Intent(Intent.ACTION_MAIN);
			intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
			intent.addCategory(Intent.CATEGORY_HOME);
			startActivity(intent);
			return true;
		}
		return super.onKeyDown(keyCode, event);
	}
}
