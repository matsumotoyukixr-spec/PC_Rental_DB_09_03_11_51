using Microsoft.AspNetCore.Mvc;
using Npgsql;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace SUSWebApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly NpgsqlConnection _connection;

    public AuthController(NpgsqlConnection connection)
    {
        _connection = connection;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var employeeNo = request.EmployeeNo;
        var password = request.Password;

        // データベース接続をオープン
        await _connection.OpenAsync();

        try
        {
            // データベースからハッシュ化されたパスワードを取得する
            var sql = "SELECT password_hash FROM public.AUTH_USER WHERE employee_no = @EmployeeNo";
            await using var command = new NpgsqlCommand(sql, _connection);
            command.Parameters.AddWithValue("@EmployeeNo", employeeNo);

            var storedHash = await command.ExecuteScalarAsync() as string;

            // ユーザーが存在しない場合
            if (string.IsNullOrEmpty(storedHash))
            {
                return Unauthorized(new { message = "社員番号またはパスワードが正しくありません。" });
            }

            // ユーザーが入力したパスワードをハッシュ化し、データベースのハッシュ値と照合する
            // ここで、crypt()関数を使って検証を行います
            var verifySql = "SELECT crypt(@InputPassword, @StoredHash) = @StoredHash";
            await using var verifyCommand = new NpgsqlCommand(verifySql, _connection);
            verifyCommand.Parameters.AddWithValue("@InputPassword", password);
            verifyCommand.Parameters.AddWithValue("@StoredHash", storedHash);

            var isPasswordValid = (bool)await verifyCommand.ExecuteScalarAsync();

            if (isPasswordValid)
            {
                // 認証成功
                // 今後のステップで、セッションやJWTトークンの発行処理を追加します
                return Ok(new { message = "ログインに成功しました" });
            }
            else
            {
                // 認証失敗
                return Unauthorized(new { message = "社員番号またはパスワードが正しくありません。" });
            }
        }
        catch (Exception ex)
        {
            // 例外が発生した場合
            return StatusCode(500, new { message = $"サーバーエラーが発生しました: {ex.Message}" });
        }
        finally
        {
            // データベース接続をクローズ
            _connection.Close();
        }
    }
}

public class LoginRequest
{
    public string EmployeeNo { get; set; }
    public string Password { get; set; }
}