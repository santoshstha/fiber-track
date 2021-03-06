<?php namespace App\Http\Requests;

use App\Http\Requests\Request;
use Illuminate\Http\Request as Req; 
use Response;

class UpdateLocationFormRequest extends Request {

	/**
	 * Determine if the user is authorized to make this request.
	 *
	 * @return bool
	 */
	public function authorize()
	{
		return true;
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array
	 */
	public function rules(Req $request)
	{
		
		return [
             
               'name' => 'required|unique:locations,name,'.$request->segment(3),
			   'user_id' => 'required'
		];
		
	}

	public function response(array $error)
    {
        return Response::json($error,400);

    }

}
