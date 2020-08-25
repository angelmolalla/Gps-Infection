package com.example.firebase;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.FirebaseApp;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;

public class LoginActivity extends AppCompatActivity {
    Button ingresa,registra;
    EditText correo,clave;
    private FirebaseAuth mAuth;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        inicializarfirebase();
        ingresa=findViewById(R.id.ingreso);
        registra=findViewById(R.id.REGISTRAR);
        correo=findViewById(R.id.correoLog);
        clave=findViewById(R.id.claveLog);
        int permissionCheck = ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION);
        registra.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent=new Intent(LoginActivity.this,Registra.class);
                startActivity(intent);
            }
        });
        ingresa.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                if(!correo.getText().toString().isEmpty()&&!clave.getText().toString().isEmpty()){
                    loginUsuario();
                }
                else{
                    Toast.makeText(LoginActivity.this,"Complete los campos",Toast.LENGTH_SHORT).show();
                }
            }
        });


    }
    private void loginUsuario(){

        mAuth.signInWithEmailAndPassword(correo.getText().toString(),clave.getText().toString()).addOnCompleteListener(new OnCompleteListener<AuthResult>() {
            @Override
            public void onComplete(@NonNull Task<AuthResult> task) {
                if(task.isSuccessful()){
                    Toast.makeText(LoginActivity.this, "Usuario encontrado", Toast.LENGTH_SHORT).show();

                    Intent intent=new Intent(LoginActivity.this,botones.class);
                    startActivity(intent);
                }
                else{
                    Toast.makeText(LoginActivity.this, "No se encontro el usuario", Toast.LENGTH_SHORT).show();
                }
            }
        });
    }
    private void inicializarfirebase(){
        FirebaseApp.initializeApp(this);
        mAuth=FirebaseAuth.getInstance();
    }
}