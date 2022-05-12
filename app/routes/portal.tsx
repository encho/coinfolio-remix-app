import { Link, Outlet } from "@remix-run/react";

function PortalHeader() {
  return (
    <div className="flex- relative bg-white">
      <div className="flex items-center justify-between px-4 py-6 sm:px-6 md:justify-start md:space-x-10">
        <div className="flex justify-start lg:w-0 lg:flex-1">
          <a href="/portal">
            <span className="sr-only">Coinfolio Capital</span>
            <img
              className="h-[24px]"
              src="https://coinfolio.s3.eu-central-1.amazonaws.com/logos/coinfolio-capital-logo-cockpit.svg"
              alt=""
            />
          </a>
        </div>
      </div>
    </div>
  );
}

function PortalFooter() {
  return (
    <footer className="border-t-200 border-t border-gray-100 bg-gray-50 pt-12 pb-14 md:pt-16">
      <div className="container mx-auto px-4 text-center">
        <a
          className="mx-auto inline-block text-2xl leading-none text-gray-600"
          href="/portal"
        >
          <img
            className="h-[20px]"
            src="https://coinfolio.s3.eu-central-1.amazonaws.com/logos/coinfolio-capital-logo-cockpit.svg"
            alt=""
          />
        </a>
      </div>
      <div className="container mx-auto mt-2 px-4">
        <p className="text-center text-sm text-gray-400">
          All rights reserved &copy; Coinfolio Capital 2022
        </p>
      </div>
    </footer>
  );
}

export default function Dashboard() {
  // const user = useOptionalUser();
  return (
    <div>
      <PortalHeader />

      <div className="encho-bg">
        <div>
          <Link to="strategies" className="text-blue-500 underline">
            Strategies
          </Link>
        </div>
        <div>
          <Link to="cryptocurrencies" className="text-blue-500 underline">
            Cryptocurrencies
          </Link>
        </div>
      </div>

      <Outlet />
      <PortalFooter />

      {/* <MigrateOutlet /> */}
    </div>
  );
}

function MigrateOutlet() {
  return (
    <div className="bg-neue-backgroundxxx flex h-screen overflow-hidden bg-green-500 dark:bg-neuedark-background">
      {/* static sidebar for desktop */}
      <div className="z-50 hidden md:flex md:shrink-0">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="bg-neue-sidebar-backgroundxxx flex h-0 flex-1 flex-col bg-red-300 shadow dark:bg-neuedark-sidebar-background">
          {/* top sidebar part */}
          <div className="flex flex-1 flex-col overflow-y-auto bg-blue-400 pt-8 pb-4">
            {/* top logo */}
            <div className="mb-12 flex shrink-0 items-center border-l-4 border-transparent px-4 text-neue-sidebar-logo dark:text-neuedark-sidebar-logo">
              <div className="block dark:hidden">
                {/* <a href="/app/dashboard"> */}
                <a href=".">
                  <img
                    className="h-[24px]"
                    src="https://coinfolio.s3.eu-central-1.amazonaws.com/logos/coinfolio-capital-logo-cockpit.svg"
                    alt=""
                  />
                </a>
              </div>
              <div className="hidden dark:block">
                {/* <a href="/app/dashboard"> */}
                <a href=".">
                  {/* TODO link to logo for dark app mode */}
                  <img
                    className="h-[24px]"
                    src="https://coinfolio.s3.eu-central-1.amazonaws.com/logos/coinfolio-capital-logo-cockpit.svg"
                    alt=""
                  />
                </a>
              </div>
            </div>

            {/* nav links */}
            <nav className="mt-32 flex-1 space-y-1">
              {/* <a href="." className="group flex items-center px-4 py-2 text-sm font-medium border-l-4 nd-cockpit-nav-link"> */}
              <a
                href="."
                className="nd-cockpit-nav-link-inactive group flex items-center border-l-4 px-4 py-2 text-sm font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                    clip-rule="evenodd"
                  />
                </svg>
                Dashboard
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

// <!-- Static sidebar for desktop -->
// <div class="hidden md:flex md:shrink-0 z-50">
//   <div class="flex flex-col w-64">
//     <!-- Sidebar component, swap this element with another sidebar if you like -->
//     <div class="flex flex-col h-0 flex-1 bg-neue-sidebar-background dark:bg-neuedark-sidebar-background shadow">
//       <div class="flex-1 flex flex-col pt-8 pb-4 overflow-y-auto">
//         <div
//           class="flex items-center shrink-0 px-4 border-l-4 border-transparent mb-12 text-neue-sidebar-logo dark:text-neuedark-sidebar-logo">
//           <div class="block dark:hidden">
//             <a href="/app/dashboard">
//               <img class="h-logo" src={get_brand_logo_svg(@conn)} alt="" />
//             </a>
//           </div>
//           <div class="hidden dark:block">
//             <a href="/app/dashboard">
//               <img class="h-logo" src={get_brand_logo_dark_svg(@conn)} alt="" />
//             </a>
//           </div>
//         </div>
//         <nav class="mt-32 flex-1 space-y-1">
//           <%= link to: Routes.live_path(@conn, NeueDeutscheWeb.MockupApp.DashboardPageLive), class: css_class(@conn, Routes.live_path(@conn, NeueDeutscheWeb.MockupApp.DashboardPageLive)  ,"group flex items-center px-4 py-2 text-sm font-medium border-l-4", "nd-cockpit-nav-link", "nd-cockpit-nav-link-inactive")  do %>
//             <!-- Heroicon name: filled/trending-up -->
//             <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//               <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd" />
//             </svg>

//             Dashboard
//           <% end %>

//           <%= link to: Routes.live_path(@conn, NeueDeutscheWeb.ClientApp.StrategiesPageLive), class: css_class(@conn, Routes.live_path(@conn, NeueDeutscheWeb.ClientApp.StrategiesPageLive)  ,"group flex items-center px-4 py-2 text-sm font-medium border-l-4", "nd-cockpit-nav-link", "nd-cockpit-nav-link-inactive")  do %>
//             <!-- Heroicon name: filled/document-report -->
//             <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//               <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z" clip-rule="evenodd" />
//             </svg>
//             Crypto Baskets
//           <% end %>

//           <%= link to: Routes.live_path(@conn, NeueDeutscheWeb.ClientApp.StrategiesPageLive), class: css_class(@conn, Routes.live_path(@conn, NeueDeutscheWeb.ClientApp.StrategiesPageLive)  ,"group flex items-center px-4 py-2 text-sm font-medium border-l-4", "nd-cockpit-nav-link", "nd-cockpit-nav-link-inactive")  do %>
//             <!-- Heroicon name: filled/document-report -->
//             <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//               <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z" clip-rule="evenodd" />
//             </svg>
//             Crypto Baskets
//           <% end %>

//           <%= link to: Routes.live_path(@conn, NeueDeutscheWeb.ClientApp.CustodiansPageLive), class: css_class(@conn, Routes.live_path(@conn, NeueDeutscheWeb.ClientApp.CustodiansPageLive)  ,"group flex items-center px-4 py-2 text-sm font-medium border-l-4", "nd-cockpit-nav-link", "nd-cockpit-nav-link-inactive")  do %>
//             <!-- Heroicon name: filled/library -->
//             <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//               <path fill-rule="evenodd"
//                 d="M10.496 2.132a1 1 0 00-.992 0l-7 4A1 1 0 003 8v7a1 1 0 100 2h14a1 1 0 100-2V8a1 1 0 00.496-1.868l-7-4zM6 9a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1zm3 1a1 1 0 012 0v3a1 1 0 11-2 0v-3zm5-1a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1z"
//                 clip-rule="evenodd" />
//             </svg>
//             Custody Account
//           <% end %>

//           <%= link to: Routes.live_path(@conn, NeueDeutscheWeb.ClientApp.StrategiesPageLive), class: css_class(@conn, Routes.live_path(@conn, NeueDeutscheWeb.ClientApp.StrategiesPageLive)  ,"group flex items-center px-4 py-2 text-sm font-medium border-l-4", "nd-cockpit-nav-link", "nd-cockpit-nav-link-inactive")  do %>
//             <!-- Heroicon name: filled/mail -->
//             <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//               <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
//               <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
//             </svg>

//             Mailbox
//           <% end %>

//           <%= link to: Routes.user_settings_path(@conn, :edit), class: css_class(@conn, Routes.user_settings_path(@conn, :edit)  ," group flex items-center px-4 py-2 text-sm font-medium border-l-4", "nd-cockpit-nav-link", "nd-cockpit-nav-link-inactive")  do %>
//             <!-- Heroicon name: filled/user-circle -->
//             <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//               <path fill-rule="evenodd"
//                 d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
//                 clip-rule="evenodd" />
//             </svg>
//             Profile
//           <% end %>
//         </nav>
//       </div>
//       <div
//         class="shrink-0 flex border-t border-neue-sidebar-separator dark:border-neuedark-sidebar-separator py-4">
//         <%= link to: Routes.user_session_path(@conn, :delete), method: :delete, class: css_class(@conn, Routes.user_session_path(@conn, :delete)  ," group flex items-center px-4 py-2 text-sm font-medium border-l-4", "nd-cockpit-nav-link", "nd-cockpit-nav-link-inactive")  do %>
//         <!-- Heroicon name: outline/logout -->
//         <svg class="mr-2 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
//           stroke="currentColor" aria-hidden="true">
//           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
//             d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//         </svg>
//         Log out
//         <% end %>
//       </div>
//     </div>
//   </div>
// </div>
