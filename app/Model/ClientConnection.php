<?php namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class ClientConnection extends Model {

	protected $table = 'locations';
	
	protected $fillable = ['name','user_id'];

}
