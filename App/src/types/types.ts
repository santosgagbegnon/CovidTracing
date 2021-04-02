interface UserInfo {
    accountType: "personal" | "business";
    email:string;
    [x: string]: any;//allows other properties
} 

interface SignInStatus {
    signInStatus: boolean;
}

export {UserInfo, SignInStatus}