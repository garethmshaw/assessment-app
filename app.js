console.log("APP INITIALIZING 🚀");

document.addEventListener("DOMContentLoaded", () => {

    console.log("DOM READY ✅");

    const SUPABASE_URL = "https://kzdfqzcogbittkobupem.supabase.co";
    const SUPABASE_KEY = "sb_publishable_lRFfhZ7D3J10hSJIOuJ9qA_S20IJrG1";

    const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    const btn = document.getElementById("loadBtn");

    btn.addEventListener("click", async () => {

        console.log("BUTTON CLICKED ✅");

        const { data, error } = await client
            .from('students')
            .select('*');

        console.log("DATA:", data);
        console.log("ERROR:", error);

        if (error) {
            document.getElementById("output").innerText = error.message;
            return;
        }

        document.getElementById("output").innerHTML =
            data.map(s => `<p>${s.name}</p>`).join('');
    });

});