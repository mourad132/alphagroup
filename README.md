# Alpha Group Documentation

## Overview
Alpha group website shows upcoming events held by the company and offers a vareity of training and courses, The Website is Classified into 5 Phases

# Phase 1

## Features
- Add/Delete/Update Events
- Show All Events
- Add Images To Each Event

## Pages

### Landing Page
Contains: 
- Logos
- Login / Sign Up Button
### Home Page
Contains:
- Introducing Video
- About Us
- Events
- Our Partners
- Footer

### Event Page
Contains:
- Event Card
- Footer

### Contact Us
Contains: 
- Contact Us Data

## Schema

### Events
- Name
- Presentor
- Image
- Description
- Date
- Time
- Place

## Administration Panel
### Pages
#### Admin Login Page
Let's You Login to the admin panel
#### Home Page
This Page Shows All The Administration Features, It Contains:
- Event Cards
- Add Event Button

#### Add Event Page
Let's You Add New Event
You Have to add:
- Event Name
- Event Presentor
- Event Image (Optional)
- Event Description (Optional)
- Event Date
- Event Time
- Event Place

## API's
| API Name | Route | Method | Require Auth|
|----------|-------|--------|------------ |
|Add Event | /events  | POST  | YES |
|Show All Events|/events|GET| YES |
|Show One Event|/events/:id|GET| YES |
|Delete Event|/events/:id|DELETE| YES |
|Update Event|/events/:id|PUT| YES |

## Routes
| Route Name | Path |Description|API Used | Params|
| -----------|------|------------|--------|-------|
| Landing | / | Renders The Landing Page | N/A | N/A
| Home | /home | Renders The Home Page | Show All Events| Events Array|
| Event | /event/:id | Displays An Event | Show One Event| Event Object|
| Contact Us | /contact-us | Renders Contact Us Page| N/A| N/A
| Admin Login | /admin/login | Renders Admin Login Form | N/A | N/A
| Admin Home Page | /home | Renders Home Page With Admin Privlages| Show All Events | Events Array
| Add Event | /events/add | Rendes Add Events Form | Add Event / Auth | N/A
| Update Event | /events/:id | Renders Event Page With Admin Privlages | Show An Event | Event Object

# Phase 2

## Features
- Added `Profiles` For Users
- Added Event Ticket Purchasing Using `Voucher Codes`
- Added Online Tickets Using `QR Codes`
- Added Ticket `QR Code Scanning`
- Track Users `Present/Absent` from the `Event`

## Pages 

### Sign Up Page
A Sign Up Form to make a new user
this form will be get:
- Full Name
- E-mail Address
- Password
- Phone Number
- Governoment

### My Profile Page
Displays User Profile, So The User can edit his profile
this profile contains:
- Full Name
- E-mail Address
- Phone Number
- Governoment

And Creates a New ```User```

### My Events Page
it Includes All The Event Tickets That the user had purchased from ```User.tickets Array```
This Page Contains:
- Event Cards

### Event Page (Edit)
Add voucher Code functionality which allows the user to add a `voucher code` to buy the ticket, once the voucher is valid, the event will be purchased by the user and added to the ``` User.events Array```

### Online Tickets
Add A QR Code with a `refrence number` to scan it while entering the event

## Schemas

### User
- Name
- Email
- Phone
- Password
- Governoment
- tickets

## Ticket
- event
- refrence number
- user_id

## Event (Edit)
Add New Voucher Codes `Array` To the `Schema`


## API's
| API Name | Route | Method | Require Auth| Params|
|----------|-------|--------|------------ |--------|
|Voucher Code | /voucher  | POST  | YES | voucher |
| Sign Up | /sign-up | POST | NO | User Object |
| Login | /log-in | POST | NO | N/A |
| Profile | /profile | GET | YES | N/A |
| My Events | /my-events | GET | YES | N/A |

## Routes
| Route Name | Path |Description|API Used | Params|
| -----------|------|------------|--------|-------|
| My Profile | /profile | Renders The My Profile Page | /profile | User Object
| My Events | /my-events | Renders My Events Page | /my-events| Events Array |
| Ticket | /tickets/:id | Renders Ticket Page| Ticket Object|

## Admin
### Pages
#### Ticket Scanning
This Page Allows the admin to scan Ticket QR Codes Or Enter The Refrence Number
This Page Contains: 
- A `QR Code Scanner`
- A Form for `Refrence Number`

#### Admin Event Page (Edit)

The Event Page now renders all the users that have purchased the event tickets, while also checking the users present and absent


### API's
| API Name | Route | Method | Requires Admin Auth| Params|
|----------|-------|--------|------------ |--------|
|Profiles | /profiles  | GET  | YES | Profiles Array |
| Profile | /profiles/:id | GET | YES | Profile Object |
| Voucher Code | /voucher | GET | YES | N/A |
| Voucher Code | /voucher | POST | YES | Voucher


### Routes
| Route Name | Path |Description|API Used | Params|
| -----------|------|------------|--------|-------|
| Ticket Scanner | /scanner | Renders The Ticket Scanner | /scanner | N/A
| Profiles | /profiles | Renders All The Profile Cards | /profiles | Profiles Array |
| Profile | /profiles/:id | Renders A Profile By Id | /profiles/:id | Profile Object
| Voucher Code | /voucher | Renders the voucher code page | /voucher | N/A
