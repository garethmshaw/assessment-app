console.log("CLEAN VERSION LOADED ✅");

const SUPABASE_URL = "https://kzdfqzcogbittkobupem.supabase.co";
const SUPABASE_KEY = "sb_publishable_lRFfhZ7D3J10hSJIOuJ9qA_S20IJrG1";

const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

document.addEventListener("DOMContentLoaded", loadAssessments);

document.getElementById("loadBtn")
    .addEventListener("click", loadResults);


// ✅ LOAD ASSESSMENTS INTO DROPDOWN
async function loadAssessments() {

    console.log("Loading assessments...");

    const { data, error } = await client
        .from('assessments')
        .select('*');

    if (error) {
        console.log(error);
        return;
    }

    const dropdown = document.getElementById("assessmentSelect");

    data.forEach(a => {
        const option = document.createElement("option");
        option.value = a.id;
        option.textContent = a.name;
        dropdown.appendChild(option);
    });

    console.log("Assessments loaded ✅");
}


// ✅ LOAD RESULTS WHEN BUTTON CLICKED
async function loadResults() {

    console.log("BUTTON CLICKED ✅");

    const assessmentId = document.getElementById("assessmentSelect").value;

    const { data, error } = await client
        .from('results')
        .select(`
            correct,
            students(name)
        `)
        .eq('assessment_id', assessmentId);

    console.log("DATA:", data);
    console.log("ERROR:", error);

    if (error) {
        document.getElementById("output").innerText = error.message;
        return;
    }

    // ✅ SCORE CALCULATION
    const scores = {};

    data.forEach(r => {

        const name = r.students.name;

        if (!scores[name]) {
            scores[name] = { correct: 0, total: 0 };
        }

        scores[name].total++;

        if (r.correct) {
            scores[name].correct++;
        }
    });

    // ✅ DISPLAY
    let html = "<h3>Scores</h3>";

    for (const student in scores) {

        const s = scores[student];

        html += `<p>
            <strong>${student}</strong>: 
            ${s.correct} / ${s.total}
        </p>`;
    }

    document.getElementById("output").innerHTML = html;
}