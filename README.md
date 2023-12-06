# Alpha Group Documentation

<img src="./Logo.png">

## Overview
Alpha group website shows upcoming events held by the company and offers a vareity of training and courses, The Website is Classified into 5 Phases

# Phase 1

<img src="/home/mourad/Desktop/alphagroup/Phase 1.png">

## Features
- Add/Delete/Update Events
- Show All Events
- Add Images To Each Event

## Pages

### Landing Page
<img src="./Landing Page.png">

Contains: 
- Logos
- Login / Sign Up Button
### Home Page
<img src="./Home Page.png">

Contains:
- Introducing Video
- About Us
- Events
- Our Partners
- Footer

### Events Page
<img src="./Events Page.png">

Contains:
- Filter Option
- Events Cards
- Footer

### Event Page
<img src="./Event Page.png">

Contains:
- Event Card
- Footer

### Contact Us
<img src="./Contact Us Page.png">

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
<img src="./Admin Phase 1.png">

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

<img src="./Phase 2.png">       

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
- ref_number
- user
- checked
- expired

## Event (Edit)
Add New Voucher Codes `Array` To the `Schema`


## API's
| API Name | Route | Method | Require Auth| Params|
|----------|-------|--------|------------ |--------|
| Assign Ticket | /ticket  | POST  | YES | Ticket |
| Sign Up | /sign-up | POST | NO | User Object |
| Login | /log-in | POST | NO | N/A |

## Routes
| Route Name | Route | Description | Require Auth |  API Used | Params|
| -----------|------|------------|--------|-------|----|
| My Profile | /profile | Renders The My Profile Page | YES | /profile | User Object
| My Events | /my-events | Renders My Events Page | YES |  /my-events| Events Array |
| Ticket | /tickets/:id | Renders Ticket Page| YES| /tickets/:id | Ticket Object|
| Sign Up | /sign-up | Renders The Sign Up Page | NO | /sign-up | User Object |
| Log In | /log-in | Renders The Login Page | NO | /log-in | Email , Password | 


## Admin
<img src="./Admin Phase 2.png">

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
| New Ticket | /tickets/new | POST | YES | Event Name |



### Routes
| Route Name | Path |Description|API Used | Params|
| -----------|------|------------|--------|-------|
| Ticket Scanner | /scanner | Renders The Ticket Scanner | /scanner | N/A
| Profiles | /profiles | Renders All The Profile Cards | /profiles | Profiles Array |
| Profile | /profiles/:id | Renders A Profile By Id | /profiles/:id | Profile Object
| Voucher Code | /voucher | Renders the voucher code page | /voucher | N/A
| Tickets | /tickets | GET | YES | Tickets Array |
| Event | /events/:id | GET | YES | Event |

### Implementation

#### Voucher Code

#### Create New Voucher
1) Create A New Refrence Number `EVE-12345678` And Make Sure It is Unique
2) Voucher API Creates a new `Ticket` Object

#### Assign Voucher (Create A Ticket For User)
1) Search For The `Refrence Number`
2) Check If It Exists And:
- Doesn't Belong To Any User 
- `Ticket.user` is `undefined`
3) Add `User ID` To `Ticket.user`
4) Add `Refrence Number` To `User.tickets` Array
 
### My Events
 1) For Each `Refrence Number` In `User.tickets`
 - Search For `Event` Using `Refrence Number`
 - If Event Time Is Over:
 - Turn `Ticket.expired` to be `true`
 2) Return `Events Array`

### Scanning
1) Search For The `Ticket` Using `Refrence Code`
2) Check If `Ticket.checked` is `true`
- Return `Ticket Has Already Been Checked` And The `User Object` 
3) If `Ticket.checked` is `false` 
- Turn `Ticket.checked` to be `true`
- Return `Ticket Has Been Successfully Checked` And The `User Object`