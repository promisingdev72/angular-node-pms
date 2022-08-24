--
-- PostgreSQL database dump
--

-- Dumped from database version 11.2
-- Dumped by pg_dump version 11.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: color_components; Type: TABLE; Schema: public; Owner: inkcraft_admin
--

CREATE TABLE public.color_components (
    id integer NOT NULL,
    abrv character varying(10) NOT NULL,
    description character varying(50) NOT NULL,
    secondary_description character varying(50)
);


ALTER TABLE public.color_components OWNER TO inkcraft_admin;

--
-- Name: color_components_id_seq; Type: SEQUENCE; Schema: public; Owner: inkcraft_admin
--

CREATE SEQUENCE public.color_components_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.color_components_id_seq OWNER TO inkcraft_admin;

--
-- Name: color_components_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: inkcraft_admin
--

ALTER SEQUENCE public.color_components_id_seq OWNED BY public.color_components.id;


--
-- Name: pms_colors; Type: TABLE; Schema: public; Owner: inkcraft_admin
--

CREATE TABLE public.pms_colors (
    id integer NOT NULL,
    pms_number character varying(10) NOT NULL,
    component1 character varying(10),
    component2 character varying(10),
    component3 character varying(10),
    component4 character varying(10),
    component5 character varying(10),
    component6 character varying(10),
    component7 character varying(10),
    component8 character varying(10),
    component9 character varying(10),
    component10 character varying(10),
    component11 character varying(10),
    component12 character varying(10),
    component13 character varying(10),
    component14 character varying(10),
    component15 character varying(10),
    quantity1 numeric,
    quantity2 numeric,
    quantity3 numeric,
    quantity4 numeric,
    quantity5 numeric,
    quantity6 numeric,
    quantity7 numeric,
    quantity8 numeric,
    quantity9 numeric,
    quantity10 numeric,
    quantity11 numeric,
    quantity12 numeric,
    quantity13 numeric,
    quantity14 numeric,
    quantity15 numeric,
    description character varying(50),
    secondary_description character varying(50),
    series character varying(10)
);


ALTER TABLE public.pms_colors OWNER TO inkcraft_admin;

--
-- Name: pms_colors_id_seq; Type: SEQUENCE; Schema: public; Owner: inkcraft_admin
--

CREATE SEQUENCE public.pms_colors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pms_colors_id_seq OWNER TO inkcraft_admin;

--
-- Name: pms_colors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: inkcraft_admin
--

ALTER SEQUENCE public.pms_colors_id_seq OWNED BY public.pms_colors.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: inkcraft_admin
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(30) NOT NULL,
    email character varying(30),
    password character varying(30) NOT NULL,
    isadmin boolean DEFAULT false,
    isuser boolean DEFAULT false
);


ALTER TABLE public.users OWNER TO inkcraft_admin;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: inkcraft_admin
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO inkcraft_admin;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: inkcraft_admin
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: color_components id; Type: DEFAULT; Schema: public; Owner: inkcraft_admin
--

ALTER TABLE ONLY public.color_components ALTER COLUMN id SET DEFAULT nextval('public.color_components_id_seq'::regclass);


--
-- Name: pms_colors id; Type: DEFAULT; Schema: public; Owner: inkcraft_admin
--

ALTER TABLE ONLY public.pms_colors ALTER COLUMN id SET DEFAULT nextval('public.pms_colors_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: inkcraft_admin
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: color_components; Type: TABLE DATA; Schema: public; Owner: inkcraft_admin
--

COPY public.color_components (id, abrv, description, secondary_description) FROM stdin;
5	NWB	NW BASE (P-65)	\N
6	NWW	NW WHITE (P-65	\N
7	EXLOB	EX-LO BASE (P-65)	\N
8	EXLOW	EX-LO WHITE (P-65)	\N
9	2TIERB	2ND TIER BASE (P-65)	\N
10	PIB	PI BASE (P-65)	\N
11	PIW	PI WHITE (P-65)	\N
12	OPBW	OPAQUE BASE (W)+(P-65)	\N
13	SH	SOFTHAND(P-65)	\N
14	SPB	S.PUFF BASE (P-65)	\N
15	GT	GREEN TONER	\N
16	BLUET	BLUE TONER	\N
17	UMT	ULTRAMARINE TONER	\N
18	RHMT	RHODIMINE TONER	\N
19	WRT	WARM RED TONER	\N
20	2BRT	2B RED TONER	\N
21	RUT	RUBINE TONER	\N
22	OYTD	(D) O.YELLOW TONER	\N
23	OYTS	(S) O.YELLOW TONER	\N
24	BLACKT	BLACK TONER	\N
25	WT	WHITE TONER	\N
26	FYI	FLUORESCENT YELLOW INK	\N
27	FGI	FLUORESCENT GREEN INK	\N
28	FMI	FLUORESCENT MAGNETA INK	\N
29	FRI	FLUORESCENT RED INK	\N
30	FRO	FLUORESCENT ORANGE INK	\N
31	FPI	FLUORESCENT PINK INK	\N
32	WHI7-5D	WHITE 7-5(D) INK	\N
33	MWHI	MIXING WHITE INK	\N
34	BFNI	BLACK FL NP INK	\N
35	UMI	ULTRAMARINE INK	\N
36	GI	GREY INK	\N
37	OYI	O. YELLOW INK	\N
38	RBI	ROYAL BLUE INK	\N
39	LMXMI	LEMON MXO INK	\N
40	BSMXO	BRIGHT SCARLETT MXO INK	\N
41	WARMRI	WARM RED INK	\N
42	NYI	NEON YELLOW S/O INK	\N
43	NMXOI	NAVY MXO INK	\N
44	PGI	PROCESS GREEN INK	\N
45	UBI	ULTRA BLUE INK	\N
46	287BI	287 BLUE INK	\N
47	AI	AQUA INK	\N
48	PB	PROCESS BLUE	\N
49	LYI	LEMON YELLOW INK	\N
\.


--
-- Data for Name: pms_colors; Type: TABLE DATA; Schema: public; Owner: inkcraft_admin
--

COPY public.pms_colors (id, pms_number, component1, component2, component3, component4, component5, component6, component7, component8, component9, component10, component11, component12, component13, component14, component15, quantity1, quantity2, quantity3, quantity4, quantity5, quantity6, quantity7, quantity8, quantity9, quantity10, quantity11, quantity12, quantity13, quantity14, quantity15, description, secondary_description, series) FROM stdin;
1	021	EXLOW	WRT	OYTS	SPB	EXLOB	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	16670	650	2624	2041	0	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	EX-LO 021 ORANGE (P-65)	\N	EX-LO
7	172	ELW	NWB	WRT	OYTD	SPB	EXB								\N	\N	11226	6010.1	978	2086	1927.8	0	\N	\N	\N	\N	\N	\N	\N	\N	\N	EX-LO 172 ORANGE (P-65)	\N	EX-LO
8	185	NWB	WRT	2TIERB	EXLOW	SPB	EXLOB	\N	\N	\N	\N	\N	\N	\N	\N	\N	14288	1021	114	454	454	3856	\N	\N	\N	\N	\N	\N	\N	\N	\N	EX-LO 185 RED (P-65)	\N	EX-LO
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: inkcraft_admin
--

COPY public.users (id, name, email, password, isadmin, isuser) FROM stdin;
1	admin_user	inkcraft@bellnet.ca	ink2019	t	f
2	debco	example@gmail.com	Debco1	f	t
\.


--
-- Name: color_components_id_seq; Type: SEQUENCE SET; Schema: public; Owner: inkcraft_admin
--

SELECT pg_catalog.setval('public.color_components_id_seq', 49, true);


--
-- Name: pms_colors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: inkcraft_admin
--

SELECT pg_catalog.setval('public.pms_colors_id_seq', 8, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: inkcraft_admin
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: color_components color_components_abrv_key; Type: CONSTRAINT; Schema: public; Owner: inkcraft_admin
--

ALTER TABLE ONLY public.color_components
    ADD CONSTRAINT color_components_abrv_key UNIQUE (abrv);


--
-- Name: color_components color_components_pkey; Type: CONSTRAINT; Schema: public; Owner: inkcraft_admin
--

ALTER TABLE ONLY public.color_components
    ADD CONSTRAINT color_components_pkey PRIMARY KEY (id);


--
-- Name: pms_colors pms_colors_pkey; Type: CONSTRAINT; Schema: public; Owner: inkcraft_admin
--

ALTER TABLE ONLY public.pms_colors
    ADD CONSTRAINT pms_colors_pkey PRIMARY KEY (id);


--
-- Name: pms_colors pms_colors_pms_number_key; Type: CONSTRAINT; Schema: public; Owner: inkcraft_admin
--

ALTER TABLE ONLY public.pms_colors
    ADD CONSTRAINT pms_colors_pms_number_key UNIQUE (pms_number);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: inkcraft_admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

