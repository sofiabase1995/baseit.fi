let talentadoreContainer = null;
const tags = ["assignment", "open+position", "direct+recruiting"];
let feedJobs = [];

// on Load
window.addEventListener("load", () => {
  // on change listener
  Array.prototype.forEach.call(
    document.querySelectorAll('input[type=radio][name="btnradio"]'),
    (radio, i) => {
      radio.addEventListener("change", onChange);
    }
  );

  // load talentadore on load page
  talentadoreContainer = document.getElementById("talentadore");
  if (talentadoreContainer instanceof Element) {
    loadTalentadore();
  }
});

const getTagIndex = () => {
  let result = tags[0];
  Array.prototype.forEach.call(
    document.querySelectorAll('input[type=radio][name="btnradio"]'),
    (radio) => {
      if (radio.checked) {
        result = radio.value;
        return;
      }
    }
  );
  return result;
};

const getChecked = (id) => {
  let result = [];
  Array.prototype.forEach.call(
    document.querySelectorAll('input[type=checkbox][name="' + id + '"]'),
    (el) => {
      if (el.checked) {
        result.push(el.value);
      }
    }
  );
  return result;
};

const loadTalentadore = () => {
  renderLoading();
  fetch(getTalentadoreUrl())
    .then((res) => res.json())
    .then((out) => {
      if (!("jobs" in out) || !Array.isArray(out.jobs)) {
        return;
      }
      feedJobs = [...out.jobs];
      render();
    })
    .catch((err) => () => {
      throw err;
    });
};

const getTalentadoreUrl = (mockup = false) => {
  if (mockup) {
    return "/assets/scripts/fixtures.json";
  }
  const taUrl = new URL("https://ats.talentadore.com/positions/kKNF8S2/json");
  taUrl.searchParams.append("v", 2);
  taUrl.searchParams.append("tags", getTagIndex());
  taUrl.searchParams.append("display_description", "job_description");
  taUrl.searchParams.append("categories", "tags");
  return taUrl;
};

const onChange = (e) => {
  if (e instanceof Event) {
    loadTalentadore();
  }
};

const onChangeCountry = (e) => {
  if (!e || !e.target || typeof e.target.value !== "string") return;
  const checked = getChecked("filter-countries");
  renderEntries(
    feedJobs.filter((j) => !j.country || checked.indexOf(j.country) !== -1)
  );
};

const filterByCountry = (entries = [], country) =>
  country ? entries.filter((entry) => country === entry.country) : entries;

const renderLoading = () => {
  if (talentadoreContainer instanceof Element) {
    talentadoreContainer.innerHTML = `
      <div class="text-center mt-5 py-5">
        <div class="spinner-border text-info" role="status"></div>
      </div>`;
  }
};

const createJobElement = ({
  id,
  name,
  link,
  location,
  country,
  city,
  business_unit_name,
  // business_unit_description,
  // description_html,
  description_text,
}) => {
  const column = document.createElement("div");
  column.id = id | "";
  column.className = "col-lg-4 mb-4";
  column.innerHTML = `<div class="card h-100">
    <div class="card-body job-card">
      <h5 class="card-title">${name}</h5>
      <small class="card-subtitle mb-2 text-muted d-flex align-items-center">
        ${business_unit_name}
      </small>
      <div class="card-text">
        ${description_text}
      </div>
      <a href="${link}" target="_blank" class="btn btn-primary my-2">Details</a>
    </div>
    <div class="card-footer d-flex align-items-center">
      <span class="material-icons-round md-secondary me-2">place</span>
      <small class="text-muted">${country}, ${city}, ${location}</small>
    </div>
  </div>`;

  return column;
};

const createFilterByCountryElement = (country = "[ Not set ]") => {
  const input = document.createElement("input");
  input.id = `country-${country}`;
  input.name = "filter-countries";
  input.value = country;
  input.checked = true;
  input.type = "checkbox";
  input.className = "form-check-input";
  input.addEventListener("input", onChangeCountry);
  input.addEventListener("propertychange", onChangeCountry);

  const label = document.createElement("label");
  label.htmlFor = `country-${country}`;
  label.className = "form-check-label text-capitalize";
  label.innerText = country;

  const el = document.createElement("div");
  el.className = "form-check form-check-inline";
  // el.innerHTML = `
  //   <input class="form-check-input" type="checkbox" name="filter-countries" id="country-${country}" value="${country}" checked>
  //   <label class="form-check-label text-capitalize" for="country-${country}">${country}</label>
  // `;
  el.appendChild(input);
  el.appendChild(label);
  return el;
};

const renderFilters = (jobs = []) => {
  const container = document.getElementById("talentadore-filters");
  container.innerHTML = ``;
  let result = [];

  // By country
  const countries = jobs
    // map with empty
    .map(
      ({ country }) =>
        // typeof country !== "string" || !country ? "- Not Set -" : country
        country
    )
    .sort()
    // unique
    .filter((value, index, self) => value && self.indexOf(value) === index);

  result = filterByCountry(jobs);

  const countriesContainer = document.createElement("div");
  for (i in countries) {
    countriesContainer.appendChild(createFilterByCountryElement(countries[i]));
  }
  container.appendChild(countriesContainer);

  // By languages

  return result;
};

const renderEntries = (jobs = []) => {
  const container = document.getElementById("talentadore");
  const message = document.getElementById("talentadore-message");
  if (!Array.isArray(jobs)) {
    return;
  }
  container.innerHTML = ``;

  // Total
  const total = document.createElement("div");
  total.className = "py-3";
  total.innerHTML = `<span class="float-end badge rounded-pill bg-success fs-6">Total: ${jobs.length}</span>`;
  container.appendChild(total);

  if (jobs.length === 0) {
    message.className = "row justify-content-center collapse show";
  } else {
    message.className = "row justify-content-center collapse";
    for (i in jobs) {
      const job = jobs[i];
      container.appendChild(createJobElement(job));
    }
  }
};

const render = () => {
  renderEntries(renderFilters(feedJobs));
};
