console.log("APP.JS LOADED");
const supabase = window.supabase.createClient( https://kzdfqzcogbittkobupem.supabase.co,sb_publishable_lRFfhZ7D3J10hSJIOuJ9qA_S20IJrG1);

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