<template>
  <q-layout view="lHh Lpr fff" class="login-layout">
    <q-page-container>
      <div class="csf_signin">
        <c-card css="q-pa-lg">
          <template #header>
            <div class="col text-h5 q-mb-lg text-center">
              <img src="@/assets/CSLOGO.jpg" class="cs-logo" />
              <div class="q-mt-xs">Page Not Found</div>
              <q-btn flat to="/dashboard" icon="eva-home-outline" />
            </div>
          </template>
        </c-card>
      </div>
    </q-page-container>
  </q-layout>
</template>
