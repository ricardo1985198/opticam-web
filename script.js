// ======================================================
// OPTISUITE - WEB
// OptiCam · OptiRuta · OptiDuc
// ======================================================

// Deep link que AndroidManifest reconoce para abrir OptiCam.
const OPTICAM_APP_URL =
  "io.supabase.opticam://confirm-email";


// ======================================================
// AL CARGAR LA PÁGINA
// ======================================================

document.addEventListener("DOMContentLoaded", () => {
  revisarConfirmacionCorreo();
});


// ======================================================
// REVISAR SI SUPABASE NOS ENVIÓ DESDE EL CORREO
// ======================================================

function revisarConfirmacionCorreo() {
  const params =
    new URLSearchParams(window.location.search);

  const hashParams =
    new URLSearchParams(
      window.location.hash.replace("#", "")
    );

  const error =
    params.get("error") ||
    hashParams.get("error");

  const errorCode =
    params.get("error_code") ||
    hashParams.get("error_code");

  const confirmation =
    params.get("confirmed") === "true";

  const hasAuthData =
    window.location.hash.includes("access_token") ||
    window.location.hash.includes("refresh_token") ||
    window.location.hash.includes("type=signup");

  const box =
    document.getElementById("emailConfirmation");

  if (!box) return;


  // ====================================================
  // ENLACE VENCIDO O INVÁLIDO
  // ====================================================

  if (
    error === "access_denied" ||
    errorCode === "otp_expired"
  ) {
    box.style.display = "flex";

    box.innerHTML = `
      <button
        class="close-confirmation"
        onclick="cerrarConfirmacion()"
        aria-label="Cerrar"
      >
        ×
      </button>

      <div class="confirmation-icon">
        !
      </div>

      <div>
        <h2>
          El enlace ya no es válido
        </h2>

        <p>
          El enlace de confirmación venció
          o ya fue utilizado.
        </p>

        <p>
          Regresa a OptiCam e intenta iniciar sesión.
          Si tu correo todavía no está confirmado,
          solicita nuevamente el correo de confirmación.
        </p>

        <button
          class="open-app-button"
          onclick="volverAOptiCam()"
        >
          VOLVER A OPTICAM
        </button>
      </div>
    `;

    return;
  }


  // ====================================================
  // CORREO CONFIRMADO
  // ====================================================

  if (confirmation || hasAuthData) {
    box.style.display = "flex";

    box.innerHTML = `
      <button
        class="close-confirmation"
        onclick="cerrarConfirmacion()"
        aria-label="Cerrar"
      >
        ×
      </button>

      <div class="confirmation-icon">
        ✓
      </div>

      <div>
        <h2>
          ¡Correo confirmado correctamente!
        </h2>

        <p>
          Gracias por confirmar tu cuenta de OptiCam.
          Ya completaste el primer paso.
        </p>

        <p>
          Antes de continuar puedes conocer
          las soluciones de OptiSuite.
        </p>

        <p>
          Ahora regresa a
          <strong>OptiCam</strong>.
          Allí continuarás con la activación
          de tu suscripción de
          <strong>$5.500 COP al mes</strong>.
        </p>

        <button
          class="open-app-button"
          onclick="volverAOptiCam()"
        >
          VOLVER A OPTICAM Y CONTINUAR
        </button>
      </div>
    `;

    return;
  }


  // ====================================================
  // VISITA NORMAL A LA WEB
  // ====================================================

  box.style.display = "none";
}


// ======================================================
// VOLVER A OPTICAM
// ======================================================

function volverAOptiCam() {
  try {
    window.location.href = OPTICAM_APP_URL;
  } catch (error) {
    console.error(
      "No se pudo abrir OptiCam:",
      error
    );
  }
}


// ======================================================
// CERRAR MENSAJE DE CONFIRMACIÓN
// ======================================================

function cerrarConfirmacion() {
  const box =
    document.getElementById("emailConfirmation");

  if (box) {
    box.style.display = "none";
  }
}


// ======================================================
// REGISTRO PARA NOVEDADES
// ======================================================

function registrarCorreo() {
  const input =
    document.getElementById("email");

  const message =
    document.getElementById("contactMessage");

  if (!input || !message) return;

  const email =
    input.value.trim();

  if (!email) {
    message.textContent =
      "Escribe tu correo electrónico.";

    return;
  }

  if (!validarCorreo(email)) {
    message.textContent =
      "Escribe un correo electrónico válido.";

    return;
  }

  message.textContent =
    "¡Gracias! Tu correo quedó listo para recibir novedades de OptiSuite.";

  input.value = "";
}


// ======================================================
// VALIDAR CORREO
// ======================================================

function validarCorreo(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


// ======================================================
// WHATSAPP
// ======================================================

function abrirWhatsApp() {
  const input =
    document.getElementById("whatsapp");

  const message =
    document.getElementById("contactMessage");

  if (!input) return;

  let telefono =
    input.value.trim();

  telefono =
    telefono.replace(/\D/g, "");

  if (!telefono) {
    if (message) {
      message.textContent =
        "Escribe tu número de WhatsApp.";
    }

    return;
  }

  const texto =
    "Hola, quiero recibir información y novedades de OptiSuite, OptiCam, OptiRuta y OptiDuc.";

  const url =
    "https://wa.me/" +
    telefono +
    "?text=" +
    encodeURIComponent(texto);

  window.open(
    url,
    "_blank",
    "noopener,noreferrer"
  );
}

  window.open(url, "_blank");
}
