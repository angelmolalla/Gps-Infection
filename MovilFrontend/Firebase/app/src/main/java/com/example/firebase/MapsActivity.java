package com.example.firebase;

import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.FragmentActivity;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.widget.Toast;

import com.google.android.gms.location.GeofencingClient;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.Circle;
import com.google.android.gms.maps.model.CircleOptions;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;

public class MapsActivity extends FragmentActivity implements OnMapReadyCallback {

    private GoogleMap mMap;
    private GeofencingClient geofencingClient;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_maps);
        geofencingClient = LocationServices.getGeofencingClient(this);

        // Obtain the SupportMapFragment and get notified when the map is ready to be used.
        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);
    }

    /**
     * Manipulates the map once available.
     * This callback is triggered when the map is ready to be used.
     * This is where we can add markers or lines, add listeners or move the camera. In this case,
     * we just add a marker near Sydney, Australia.
     * If Google Play services is not installed on the device, the user will be prompted to install
     * it inside the SupportMapFragment. This method will only be triggered once the user has
     * installed Google Play services and returned to the app.
     */
    @Override
    public void onMapReady(GoogleMap googleMap) {
        mMap = googleMap;
        double coordY=-0.179652;
        double coordX=-78.439127;
        double coordY1=-0.189852;
        double coordX1=-78.449327;
        final LatLng center = new LatLng(coordY, coordX);
        final LatLng center2 = new LatLng(coordY1, coordX1);
        final int radius = 100;
        Circle circle = mMap.addCircle(new CircleOptions()
                .center(center)
                .radius(radius)
                .strokeColor(Color.parseColor("#FFCDD2"))
                .strokeWidth(4)
                .fillColor(Color.parseColor("#FFCDD2")));
        Circle circle2 = mMap.addCircle(new CircleOptions()
                .center(center2)
                .radius(radius)
                .strokeColor(Color.parseColor("#FFCDD2"))
                .strokeWidth(4)
                .fillColor(Color.parseColor("#FFCDD2")));
        mMap.addMarker(new MarkerOptions().position(center).title("SECTOR DE RIESGO"));
        mMap.addMarker(new MarkerOptions().position(center2).title("SECTOR DE RIESGO"));
        // Register the listener with the Location Manager to receive location updates
        int permissionCheck =ContextCompat.checkSelfPermission(this,Manifest.permission.ACCESS_FINE_LOCATION);
        mMap.setMyLocationEnabled(true);
        mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(center, 17));
        enableUserLocation();
    }
    private void enableUserLocation(){
        if(ContextCompat.checkSelfPermission())
    }
}