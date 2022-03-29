<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Model;


class TimeOff extends Model
{
    use HasFactory;
    protected $table="time_off";
    protected $fillable = [
        'id',
        'user_id',
        'date_from',
        'date_to',
        'time_from',
        'time_to',
        'note',
        'status',
        'created_at',
        'updated_at',
    ];
}
