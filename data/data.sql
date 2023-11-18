



create or replace function has_role(_userId integer, _rolename varchar)
returns boolean as $$
begin
  return 
	(select "role_id" from users where "userId" = _userId)
	= (select "role_id" from roles where "name" = _rolename);
end;
$$ language plpgsql;


create or replace function there_availability(_trip_id integer, _add_num integer)
returns boolean as $$ declare _people_count integer; _boat_capacity integer; _boat_id integer;
begin
	_boat_id = (select sum("boat_id") from trips where "trip_id" = _trip_id);
	_people_count = (select sum("people") from tickets where "trip_id" = _trip_id);
	_boat_capacity = (select "capacity" from boats where "boat_id" = _boat_id);
	return _people_count + _add_num < _boat_capacity;
end;
$$ language plpgsql;


create table if not exists users (
	"userId" serial primary key,
	"firstname" varchar not null,
	"lastname" varchar not null,
	"username" varchar not null unique, 
	"password" varchar not null
);

create table if not exists admins (
	"userId" integer primary key,
	foreign key ("userId") references users("userId")
);

create table if not exists sellers (
	"userId" integer primary key,
	foreign key ("userId") references users("userId")
);

create table if not exists boatmans (
	"userId" integer primary key,
	foreign key ("userId") references users("userId")
);

create table if not exists public (
	"userId" integer primary key,
	foreign key ("userId") references users("userId")
);

create table if not exists boats (
	"boatId" serial primary key,
	"boatmanId" integer not null,
	"name" varchar not null,
	"capacity" integer not null,
	check ("capacity" > 0)
	foreign key ("boatmanId") references users("userId"),
);

create table if not exists docks (
	"idDock" serial primary key,
	"name" varchar not null unique
);

create table if not exists trips (
	"tripId" serial primary key,
	"startDock" integer not null,
	"endDock" integer not null,
	"datetime" timestamp not null,
	"boatId" integer not null,
	"price" numeric(10, 2) not null,
	foreign key ("startDock") references docks("idDock"),
	foreign key ("endDock") references docks("idDock"),
	foreign key ("boatId") references boats("boatId"),
	unique ("boatId", "datetime"),
	check ("startDock" <> "endDock")
);

create table if not exists tickets (
	"ticketId" serial primary key,
	"vip" boolean not null,
	"people" integer not null,
	"purchased_at" timestamp not null,
	"trip_id" integer not null,
	"seller_id" integer not null,
	"passenger_id" integer not null,
	foreign key (seller_id) references users(userId),
	foreign key (passenger_id) references users(userId),
	foreign key (trip_id) references trips(trip_id),
	check (has_role("seller_id", 'Vendedor')),
	check (has_role("passenger_id", 'Pasajero')),
	check ("people" > 0)
);






-- Data

insert into docks (place) values 
	('Rodadero'),
	('La Marina'),
	('Taganga'),
	('Playa Blanca'),
	('Playa Grande');

insert into roles (name) values 
	('Administrador'),
	('Vendedor'),
	('Lanchero'),
	('Pasajero');

-- Function

insert into users (role_id, firstname, lastname, username, password)
values (1, 'Miguel', 'Amézquita', 'mimodev', 'test_password'),
	   (2, 'Juan', 'Pérez', 'juanpe', 'test_password'),
	   (2, 'Luisa', 'Hernández', 'luisaher', 'test_password'),
	   (3, 'Pablo', 'Martínez', 'pablomar', 'test_password'),
	   (3, 'Lucas', 'Henao', 'luhe', 'test_password'),
	   (3, 'Hernán', 'Salazar', 'hesa', 'test_password'),
	   (3, 'Juana', 'Guillín', 'jagu', 'test_password'),
	   (4, 'María', 'Pabón', 'mapa', 'test_password'),
	   (4, 'Camilo', 'Ortega', 'camor', 'test_password'),
	   (4, 'Johan', 'Narváez', 'johan', 'test_password'),
	   (4, 'Carlos', 'Correa', 'caco', 'test_password'),
	   (4, 'Didier', 'Fonseca', 'didi', 'test_password'),
	   (4, 'Ana', 'Mercado', 'amer', 'test_password'),
	   (4, 'Cristina', 'Marín', 'crismar', 'test_password');

insert into boats (boatman_id, name, capacity) 
values (4, 'Alexandrine', 16),
	   (5, 'Macoy', 18),
	   (6, 'Pechy', 14),
	   (7, 'Hilbert', 22);

insert into routes (dock_origin, dock_destiny)
values (1, 2), (1, 3), (1, 4), (1, 5),
       (2, 1), (2, 3), (2, 4), (2, 5),
       (3, 1), (3, 2), (3, 4), (3, 5),
       (4, 1), (4, 2), (4, 3), (4, 5),
       (5, 1), (5, 2), (5, 3), (5, 4);

