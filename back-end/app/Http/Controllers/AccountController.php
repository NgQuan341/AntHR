<?php
 
namespace App\Http\Controllers;
 
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\UsersResource;
use App\Jobs\SendEmail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

use App\Models\Employee;
use App\Models\Company;
use App\Models\User;



class AccountController extends Controller
{
      /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('auth:api', ['except' => []]);
    }

             /**
     * @SWG\GET(
     *     path="/api/account/blockAccount/{id}",
     *     description="Return a account's information",
     *     @SWG\Response(
     *         response=200,
     *         description="Block or Active account successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="email", type="string"),
     *             @SWG\Property(property="role", type="integer"),
     *             @SWG\Property(property="password", type="string"),
     *             @SWG\Property(property="status", type="string"),
     *             @SWG\Property(property="created_at", type="datetime"),
     *             @SWG\Property(property="updated_at", type="datetime"),
     *            )
     *     ),
     *     @SWG\Response(
     *         response=401,
     *         description="Failed!"
     *     ),
     *      security={
     *           {"api_key_security_example": {}}
     *       }
     * )
     */
    public function blockAccount($id){
        $admin=auth()->user();
        if($admin->role==1){
            $account=User::find($id);
            if($account){
               if($account->status==='active'){
                     $account->status = 'block';
                     $account->save();
                     return response()->json([
                        'message' => 'Block account successfully',
                        'user' => $account
                        ], 201);
               }else{
                   $account->status='active';
                   $account->save();
                   return response()->json([
                    'message' => 'Active account successfully',
                    'user' => $account
                    ], 201);
               }
            }else{
                return response()->json([
                    'error'=>1,
                    'message'=>"Failed"
                ]);
            }
        }else{
            return response()->json([
                'error'=>1,
                'message'=>"Account login is not admin"
            ]);
        }
    }

       /**
     * @SWG\POST(
     *     path="api/account/authoriseAccount/",
     *     description="Return a employee's information",
     *     @SWG\Parameter(
     *         name="id",
     *         in="query",
     *         type="integer",
     *         description="Account ID",
     *         required=true,
     *     ),
     *  @SWG\Parameter(
     *         name="role",
     *         in="query",
     *         type="integer",
     *         description="Account role",
     *         required=true,
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="Change authorise account successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="email", type="string"),
     *             @SWG\Property(property="role", type="integer"),
     *             @SWG\Property(property="password", type="string"),
     *             @SWG\Property(property="status", type="string"),
     *             @SWG\Property(property="created_at", type="datetime"),
     *             @SWG\Property(property="updated_at", type="datetime"),
     *            )
     *     ),
     *     @SWG\Response(
     *         response=401,
     *         description="Unauthorized!"
     *     ),
     *    security={
     *           {"api_key_security_example": {}}
     *       }
     * )
     */
    public function authoriseAccount(Request $request){
        $validator=Validator::make($request->all(),[
            "id"=>'required|integer',
            "role"=>'required|integer'
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);     
        }
        $admin=auth()->user();
        if($admin->role==1){
            $account=User::find($request->id);
            if($account){
                $account->role=$request->role;
                $account->save();
                return response()->json([
                    'message' => 'Change authorise account successfully',
                    'user' => $account
                    ], 201);
            }else{
                return response()->json([
                    'error'=>1,
                    'message'=>"Failed"
                ]);
            }
        }else{
            return response()->json([
                'error'=>1,
                'message'=>"Account login is not admin"
            ]);
        }
    }
}