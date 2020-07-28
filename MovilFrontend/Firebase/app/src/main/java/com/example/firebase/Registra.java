package com.example.firebase;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.app.ProgressDialog;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.example.firebase.modelo.Persona;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.FirebaseApp;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

import java.util.UUID;

public class Registra extends AppCompatActivity {
    EditText nombre,apellido,correo,clave;
    Button ingresar;
    FirebaseDatabase firebaseDatabase;
    DatabaseReference databaseReference;
    ProgressDialog progressDialog;
    private FirebaseAuth mAuth;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_registro);
        nombre=findViewById(R.id.nombre);
        apellido=findViewById(R.id.Apellido);
        correo=findViewById(R.id.correoLog);
        clave=findViewById(R.id.claveLog);
        ingresar=findViewById(R.id.Ingresar);
        ingresar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Persona p=new Persona();
                p.setUid(UUID.randomUUID().toString());
                p.setNombre(nombre.getText().toString());
                p.setApellido(apellido.getText().toString());
                p.setCorreo(correo.getText().toString());
                p.setClave(clave.getText().toString());
                mAuth.createUserWithEmailAndPassword(correo.getText().toString().trim(),clave.getText().toString().trim()).addOnCompleteListener(new OnCompleteListener<AuthResult>() {
                    @Override
                    public void onComplete(@NonNull Task<AuthResult> task) {
                        if(task.isSuccessful()){
                            Toast.makeText(Registra.this, "Registro exitoso", Toast.LENGTH_SHORT).show();
                            nombre.setText("");
                            apellido.setText("");
                            correo.setText("");
                            clave.setText("");
                        }
                        else{
                            Toast.makeText(Registra.this, "No se pudo completar el registro", Toast.LENGTH_SHORT).show();
                        }
                    }
                });
                databaseReference.child("Persona").child(p.getUid()).setValue(p);
            }
        });
        inicializarfirebase();

    }
    private void inicializarfirebase(){
        FirebaseApp.initializeApp(this);
        firebaseDatabase=FirebaseDatabase.getInstance();
        databaseReference=firebaseDatabase.getReference();
        mAuth = FirebaseAuth.getInstance();
    }
}