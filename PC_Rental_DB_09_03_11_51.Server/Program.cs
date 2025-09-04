using Npgsql;
using Microsoft.AspNetCore.SpaServices.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
// SPAサービスの静的ファイル設定を削除またはコメントアウト
// builder.Services.AddSpaStaticFiles(configuration =>
// {
//     configuration.RootPath = "pc_rental_db_09_03_11_51.client/dist";
// });

// PostgreSQL接続サービスを追加
string? connString = builder.Configuration.GetConnectionString("PostgreSQLConnection");
builder.Services.AddScoped<NpgsqlConnection>(_ => new NpgsqlConnection(connString));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
// SPA静的ファイルミドルウェアを削除
// app.UseSpaStaticFiles();

app.UseRouting();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); // サーバーのルートにアクセスした際、index.htmlを返す

app.UseSpa(spa =>
{
    // SPAのルートディレクトリを指定
    spa.Options.SourcePath = "pc_rental_db_09_03_11_51.client";

    if (app.Environment.IsDevelopment())
    {
        // 開発時はViteの開発サーバーにプロキシ
        spa.UseProxyToSpaDevelopmentServer("http://localhost:49547");
    }
});

app.Run();



/*
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
*/