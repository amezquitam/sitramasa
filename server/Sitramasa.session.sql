

create table roles (
	"roleId" serial primary key,
	"name" varchar not null unique
);

create table if not exists users (
	"userId" serial primary key,
	"roleId" integer not null,
	"firstname" varchar not null,
	"lastname" varchar not null,
	"username" varchar not null unique, 
	"password" varchar not null,
	foreign key ("roleId") references roles("roleId")
);


create table if not exists boats (
	"boatId" serial primary key,
	"boatmanId" integer not null,
	"name" varchar not null,
	"capacity" integer not null,
	foreign key ("boatmanId") references users("userId"),
	check ("capacity" > 0)
);

create table if not exists docks (
	"dockId" serial primary key,
	"name" varchar not null unique
);

create table if not exists trips (
	"tripId" serial primary key,
	"startDock" integer not null,
	"endDock" integer not null,
	"datetime" timestamp not null,
	"boatId" integer not null,
	"price" numeric(10, 2) not null,
	foreign key ("startDock") references docks("dockId"),
	foreign key ("endDock") references docks("dockId"),
	foreign key ("boatId") references boats("boatId"),
	unique ("boatId", "datetime"),
	check ("startDock" <> "endDock")
);

create table if not exists tickets (
	"ticketId" serial primary key,
	"vip" boolean not null,
	"numOfPeople" integer not null,
	"purchasedAt" timestamp not null,
	"tripId" integer not null,
	"sellerId" integer,
	"passengerId" integer not null,
	foreign key ("sellerId") references users("userId"),
	foreign key ("passengerId") references users("userId"),
	foreign key ("tripId") references trips("tripId"),
	check ("numOfPeople" > 0)
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

insert into users ("roleId", firstname, lastname, username, password)
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

insert into boats ("boatmanId", name, capacity) 
values (4, 'Alexandrine', 16),
	   (5, 'Macoy', 18),
	   (6, 'Pechy', 14),
	   (7, 'Hilbert', 22);

