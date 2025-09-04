using Npgsql;
using Microsoft.AspNetCore.SpaServices.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
// SPA�T�[�r�X�̐ÓI�t�@�C���ݒ���폜�܂��̓R�����g�A�E�g
// builder.Services.AddSpaStaticFiles(configuration =>
// {
//     configuration.RootPath = "pc_rental_db_09_03_11_51.client/dist";
// });

// PostgreSQL�ڑ��T�[�r�X��ǉ�
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
// SPA�ÓI�t�@�C���~�h���E�F�A���폜
// app.UseSpaStaticFiles();

app.UseRouting();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); // �T�[�o�[�̃��[�g�ɃA�N�Z�X�����ہAindex.html��Ԃ�

app.UseSpa(spa =>
{
    // SPA�̃��[�g�f�B���N�g�����w��
    spa.Options.SourcePath = "pc_rental_db_09_03_11_51.client";

    if (app.Environment.IsDevelopment())
    {
        // �J������Vite�̊J���T�[�o�[�Ƀv���L�V
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