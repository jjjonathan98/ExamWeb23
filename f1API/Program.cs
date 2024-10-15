using f1API.Contexts;
using Microsoft.EntityFrameworkCore; 

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<F1Context>(
    options => options.UseSqlite("Data Source=Databases/f1DB.db")
);

builder.Services.AddCors(
    options => {
        options.AddPolicy("AllowAll",
            policies => policies
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowAnyOrigin()
            );
    }
);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpClient();

var app = builder.Build();

app.UseCors("AllowAll");

app.UseStaticFiles();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();