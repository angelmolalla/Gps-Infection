package com.example.firebase;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class botones extends AppCompatActivity {
Button informacion, mapa, test;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_botones);
        informacion=findViewById(R.id.informacion);
        mapa=findViewById(R.id.mapa);
        test=findViewById(R.id.test);
        mapa.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent=new Intent(botones.this,MapsActivity.class);
                startActivity(intent);
            }
        });
    }
}