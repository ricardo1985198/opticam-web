// ============================================================
// OPTISUITE WEB
// ============================================================


// ============================================================
// VOLVER A OPTICAM
// ============================================================

function volverAOptiCam() {

  window.location.href =
    'io.supabase.opticam://confirm-email';

}


// ============================================================
// CERRAR MENSAJE DE CONFIRMACIÓN
// ============================================================

function cerrarConfirmacion() {

  const box =
    document.getElementById(
      'emailConfirmation'
    );

  if (box) {

    box.style.display =
      'none';

  }

}


// ============================================================
// REGISTRAR CORREO LOCALMENTE
// ============================================================

function registrarCorreo() {

  const input =
    document.getElementById(
      'email'
    );

  const message =
    document.getElementById(
      'contactMessage'
    );

  const email =
    input.value.trim();


  if (
    !email ||
    !email.includes('@')
  ) {

    message.textContent =
      'Escribe un correo electrónico válido.';

    return;

  }


  localStorage.setItem(
    'optisuite_email',
    email
  );


  message.textContent =
    '¡Gracias! Quedaste registrado para recibir novedades.';

}


// ============================================================
// WHATSAPP
// ============================================================

function abrirWhatsApp() {

  const input =
    document.getElementById(
      'whatsapp'
    );

  const number =
    input.value.trim();


  const text =
    encodeURIComponent(
      'Hola, quiero recibir novedades de OptiSuite, OptiCam, OptiRuta y OptiDuc.'
    );


  // ==========================================================
  // CAMBIAR ESTE NÚMERO POR EL WHATSAPP OFICIAL
  // Ejemplo Colombia:
  // 573001234567
  // ==========================================================

  const officialNumber =
    'TU_NUMERO';


  const url =
    'https://wa.me/' +
    officialNumber +
    '?text=' +
    text;


  window.open(
    url,
    '_blank'
  );

}


// ============================================================
// DETECTAR RESPUESTA DE SUPABASE
// ============================================================

window.addEventListener(
  'load',
  function() {

    const url =
      new URL(
        window.location.href
      );


    const params =
      url.searchParams;


    const hash =
      window.location.hash;


    const error =
      params.get(
        'error'
      );


    const errorCode =
      params.get(
        'error_code'
      );


    const confirmationBox =
      document.getElementById(
        'emailConfirmation'
      );


    // ========================================================
    // LINK VENCIDO
    // ========================================================

    if (
      error ===
        'access_denied' ||
      errorCode ===
        'otp_expired'
    ) {

      if (
        confirmationBox
      ) {

        confirmationBox.innerHTML =
          `

          <div class="confirmation-icon">
            !
          </div>

          <div>

            <h2>
              El enlace de confirmación venció
            </h2>

            <p>
              Este enlace ya no es válido.
              Regresa a OptiCam y solicita
              nuevamente el correo de confirmación.
            </p>

            <button
              class="open-app-button"
              onclick="volverAOptiCam()"
            >
              VOLVER A OPTICAM
            </button>

          </div>

          `;

      }

      return;

    }


    // ========================================================
    // POSIBLE CONFIRMACIÓN EXITOSA
    // ========================================================

    if (
      params.toString()
        .length > 0 ||
      hash.length > 1
    ) {

      if (
        confirmationBox
      ) {

        confirmationBox.style.display =
          'flex';

      }

    }

  }
);
