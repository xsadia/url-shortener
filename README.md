### How to run
- fill .env file following .env.example
- run `yarn` to install dependencies and `yarn dev` to start development server

### API deployed at

https://shawtie1.herokuapp.com

### Routes
```
GET /url/:hash - redirects to original URL based on a hash
```
```
POST /url - generates a hash
request body = {
	"url": original URL,
	"alias": optional custom value to be used in place of random hash,
        "expiresAt": optional date to expire shortened URL formatted YYYY-mm-dd HH:mm:ss
}
```

### Problems with this implementation
- the counter is hard coded and will reset with every deploy
- possible but not so likely collision
### Possible solution to problems
- have a dedicated server just for the counter(?)


![Untitled-2022-08-13-1553](https://user-images.githubusercontent.com/62262571/184578067-4adb1657-8e72-44b4-82f6-e2fdebed6c0a.png)
