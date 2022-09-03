import { useGoogleLogin } from "@react-oauth/google";

type GoogleLoginProps = {
    loginRedirection: (email:string) => void;
};

function GoogleLogin({loginRedirection}:GoogleLoginProps) {
    const loginWithGoogle = useGoogleLogin({
        onSuccess: async response => {
            let responsePayload;
            if (response.access_token) {
                const url = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${
                response.access_token}`;
                responsePayload = await fetch(url).then((res) => res.json());
            }
            const { email } = responsePayload;
            loginRedirection(email);
        },
    });

    return (<button
        onClick={() => loginWithGoogle()}
        type="button"
        id="login_with_google"
        className="px-4 py-2 btn btn-danger login_with_google d-flex align-items-center mx-auto"
      >
        <i className="bi bi-google" />
        <span>Ingresar con Google</span>
      </button>)
}


export default GoogleLogin;