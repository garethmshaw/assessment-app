const SUPABASE_URL = "https://kzdfqzcogbittkobupem.supabase.co";
const SUPABASE_KEY = "sb_publishable_lRFfhZ7D3J10hSJIOuJ9qA_S20IJrG1";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function loadStudents() {

    const { data, error } = await supabase
        .from('students')
        .select('*');

    if (error) {
        document.getElementById("output").innerText = error.message;
        return;
    }

    document.getElementById("output").innerHTML =
        data.map(s => `<p>${s.name}</p>`).join('');
}