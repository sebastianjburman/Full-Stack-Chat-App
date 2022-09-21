using full_stack_chat_app_backend.Interfaces;
using MongoDB.Driver;
using full_stack_chat_app_backend.Services;
using Microsoft.Extensions.Options;
using full_stack_chat_app_backend.Models;
using full_stack_chat_app_backend.Helpers;
using full_stack_chat_app_backend.Hubs;

var Builders = WebApplication.CreateBuilder(args);

// Add services to the container.
Builders.Services.Configure<UsersStoreDatabaseSettings>(Builders.Configuration.GetSection(nameof(UsersStoreDatabaseSettings)));
Builders.Services.AddSingleton<IUsersStoreDatabaseSettings>(sp=>sp.GetRequiredService<IOptions<UsersStoreDatabaseSettings>>().Value);
Builders.Services.AddSingleton<IMongoClient>(s=>new MongoClient(Builders.Configuration.GetValue<string>("UsersStoreDatabaseSettings:ConnectionString")));
Builders.Services.AddScoped<IUsersService,UsersService>();

Builders.Services.Configure<RoomsStoreDatabaseSettings>(Builders.Configuration.GetSection(nameof(RoomsStoreDatabaseSettings)));
Builders.Services.AddSingleton<IRoomsStoreDatabaseSettings>(sp => sp.GetRequiredService<IOptions<RoomsStoreDatabaseSettings>>().Value);
Builders.Services.AddSingleton<IMongoClient>(s => new MongoClient(Builders.Configuration.GetValue<string>("RoomsStoreDatabaseSettings:ConnectionString")));
Builders.Services.AddScoped<IRoomsService, RoomsService>();


Builders.Services.Configure<JwtSecret>(Builders.Configuration.GetSection("JwtSecret"));
Builders.Services.AddSignalR();


Builders.Services.AddCors(options =>
            {
                options.AddPolicy("ClientPermission", policy =>
                {
                    policy.AllowAnyHeader()
                        .AllowAnyMethod()
                        .WithOrigins("https://tetraroomsjburman.netlify.app")
                        .AllowCredentials();
                });
            });


Builders.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
Builders.Services.AddEndpointsApiExplorer();
Builders.Services.AddSwaggerGen();

var app = Builders.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseMiddleware<JwtMiddleware>();

app.UseAuthorization();
app.UseCors("ClientPermission");
app.UseRouting();
app.MapControllers();
 app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<RoomHub>("/hubs/chat");
            });

app.Run();
