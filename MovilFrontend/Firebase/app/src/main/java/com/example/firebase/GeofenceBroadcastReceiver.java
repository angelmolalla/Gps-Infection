package com.example.firebase;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.widget.Toast;

import com.google.android.gms.location.Geofence;
import com.google.android.gms.location.GeofencingEvent;

import java.util.List;

public class GeofenceBroadcastReceiver extends BroadcastReceiver {

    private static final String TAG ="GeofenceBroadcastReceiv" ;

    @Override
    public void onReceive(Context context, Intent intent) {
        NotificationHelper notificationHelper = new NotificationHelper(context);
        GeofencingEvent geofencingEvent = GeofencingEvent.fromIntent(intent);
        if (geofencingEvent.hasError()) {
            Log.d(TAG, "onReceive: Error receiving geofence event...");
            return;
        }
        List<Geofence> geofenceList = geofencingEvent.getTriggeringGeofences();
        for (Geofence geofence: geofenceList) {
            Log.d(TAG, "onReceive: " + geofence.getRequestId());
        }
//        Location location = geofencingEvent.getTriggeringLocation();
        int transitionType = geofencingEvent.getGeofenceTransition();

        switch (transitionType) {
            case Geofence.GEOFENCE_TRANSITION_ENTER:
                Toast.makeText(context, "USTED HA ENTRADO A UNA ZONA DE RIESDO", Toast.LENGTH_SHORT).show();
                notificationHelper.sendHighPriorityNotification("USTED HA ENTRADO A UNA ZONA DE RIESDO", "", MapsActivity.class);
                break;
            case Geofence.GEOFENCE_TRANSITION_EXIT:
                Toast.makeText(context, "USTED HA SALIDO DE UNA ZONA DE RIESG", Toast.LENGTH_SHORT).show();
                notificationHelper.sendHighPriorityNotification("USTED HA SALIDO DE UNA ZONA DE RIESGO", "", MapsActivity.class);
                break;
        }
    }
}
