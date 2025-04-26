<script>
  import { supabase } from '$lib/supabaseClient';

    let email = $state('');
    let password = $state('');
    let signupMessage = $state('');

    async function signUp() {
        const { error: signupError, data: signupData } = await supabase.auth.signUp({
            email,
            password
        });

        if (signupError) {
            signupMessage = signupError.message;
        } else if (!signupData.user) {
            signupMessage = "signupData not found"
        } else {
            // Create profile manually
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: signupData.user.id,
        email: email, // or whatever other fields you want
      });

    if (profileError) {
        signupMessage = 'Profile creation failed: ' + profileError.message;
    } else {
        signupMessage = 'Sign-up successful! Please check your email to confirm your account.';
    }

        }
    }
</script>

<div class="flex justify-center items-center h-screen">
    <div class="w-full max-w-xs">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onsubmit={signUp}>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                    Email
                </label>
                <input bind:value={email} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" required>
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                    Password
                </label>
                <input bind:value={password} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" autocomplete="new-password" required>
            </div>
            <div class="flex items-center justify-between">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Sign Up
                </button>
            </div>
            {#if signupMessage}
                <p class="text-red-500 text-xs italic mt-4">{signupMessage}</p>
            {/if}
        </form>
    </div>
</div>
