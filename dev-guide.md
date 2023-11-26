
#### Backend Error Codes (example: errorCode: 101 )  

***************** Authentication *********************  
-------- Sign Up (AS...) --------  
**AS101** - Invalid name  
**AS102** - Invalid email  
**AS103** - Invalid tax id  
**AS104** - Invalid zip code  
**AS105** - Sign up failed  
**AS106** - verifyToken is invalid  
**AS107** - Email is already exist  
**AS108** - Missing one or more required fields  
**AS109** - Verification email not sent  

-------- Account Verification (AA...) --------  
**AV101** - Email or AmtCode is invalid  
**AV102** - Account is already verified  
**AV103** - Account verification failed  
**AV104** - Missing one or more required fields
**AV105** - Email is not verified

-------- Email Verification (AM...) --------  
**AM101** - User not found
**AM102** - Token is invalid
**AM103** - Verify Token is expired
**AM104** - Email is already verified

--------- Create Password (ACP...) ---------
**ACP101** - Email is not verified,
**ACP102** - User not found
**ACP103** - Token is invalid
**ACP104** - Verify Token is expired
**ACP105** - Missing one or more required fields
**ACP106** - Email is not verified
**ACP107** - Account is not verified
**ACP108** - User has already create Password
**ACP109** - Password is not strong
**ACP200** - Password is not match
**ACP201** - Password creation failed

--------- Login AL (AL...) --------

**AL101** - User not found
**AL102** - Token is invalid
**AL103** - Verify Token is expired
**AL104** - Email is not verified
**AL105** - Account is not verified
**AL106** - Password or email is invalid
**AL107** - Login failed
**AL108** - Your Account is locked
