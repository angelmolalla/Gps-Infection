package com.example.firebase.Interfaces;
import com.example.firebase.modelo.user;

import retrofit2.Call;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.POST;

public interface userApi {
    @FormUrlEncoded
    @POST("users/login")
    Call<user> userLogin(
            @Field("email") String email,
            @Field("password") String password
    );
}
