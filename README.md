
# Voting Block

In this project, the conception of developing an electronic voting system using blockchain 
technology is enforced. The two-position armature provides a secure voting process without 
redundancy of being (not grounded on blockchain) systems. The blockchain-grounded 
voting design has two modules to make the whole design integrated and work along. One 
will be the Election Commission who'll be responsible for creating choices, adding 
registered parties and campaigners querying for the election added under the smart 
contracts. The other end will be the voter module where each existent can cast a vote for 
their separate Assembly Constituency and the vote will be registered on the blockchain to 
make it tamper evidence.


As per our system architecture, whoever is visiting our website irrespective of their roles, be it admin or user, they are navigated to the home page where they will get 4 options. First 
option is how to vote. Here, we will guide voters to vote by giving them a set of instructions. Then there is an account creation section where voters can create their account 
by filling all the necessary details. For the security purpose, we are storing the hash of the user's password in the database with the help of bcrypt.js library. After that, voters will get 
an email to verify their identity so that only legitimate voters can vote. The next section is the login section. Before logging in to the voter account, they should have verified their 
Email id otherwise they cannot vote. If a voter is successfully logged into his/her account then he/she can vote for a candidate, make an update profile request and after completing 
his/her tasks he/she can logout from their account. Now in the Admin section of our website, admin can add, remove and edit a particular user. Also, the admin can approve an 
update request raised by a user. All the votes per candidate will be visible to the admin and he can declare winner after the completion of election. In the About us section of our 
website, visitors can contact us via email or contact number, write a review about our website and can also suggest improvements.




## How to use it
### Frontend and Blockchain configuration
1.Clone this project and navigate to Voting-Block

```bash
  git clone https://github.com/shaunak-ss/Voting-Block.git
  cd Voting-Block
```
2.Install dependencies 
```bash
  npm install
```
3.Open new terminal to deploy smart contract using truffle
```bash
  truffle migrate --reset 
```
4.To run the application in browser 
```bash
  npm run dev 
```
### Backend
1.Install dependencies

```bash
  npm install
```
2.To run the backend server 
```bash
  nodemon index.js
```

### Voting Procedure
1.Connect to localhost:{Port Number} network in Metamask

2.Secondly, copy a private key from the Ganache GUI and use it to import the Metamask account.

3.Proceed to manually connect Metamask to the cast vote page by selecting the "Not Connected" option on the left side of your address.

4.Upon successful connection confirmation, you can proceed to cast your vote.


## Screenshots
1.Home Page
![image](https://github.com/shaunak-ss/Voting-Block/assets/69027908/5bfca7d5-0db2-4352-9699-7403d2dd38d9)

2.Signup Page
![image](https://github.com/shaunak-ss/Voting-Block/assets/69027908/85784fc4-a137-4258-b43e-ad71e5d7583b)

3.User Profile Page
![image](https://github.com/shaunak-ss/Voting-Block/assets/69027908/0f687dcd-fc03-48b0-a414-b6cc0ef07982)

4.Voting Page
![image](https://github.com/shaunak-ss/Voting-Block/assets/69027908/ecd7692b-a86c-4faf-9eee-3b963ba649d2)
