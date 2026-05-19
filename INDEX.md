---
layout: default
title: MEDELY Schools NCEE Registration 2026
permalink: /
---

<div class="py-8 px-4">
    <div class="max-w-4xl mx-auto">
        <div class="bg-white rounded-xl shadow-2xl p-8 mb-8 border-t-4 border-primary">
            <div class="text-center mb-6">
                <div class="flex items-center justify-center mb-4">
                    <div class="bg-primary w-16 h-16 rounded-full flex items-center justify-center mr-4">
                        <i class="fas fa-graduation-cap text-white text-2xl"></i>
                    </div>
                    <div>
                        <h1 class="text-3xl md:text-4xl font-bold text-dark mb-1">MEDELY SCHOOLS NCEE REGISTRATION 2026</h1>
                        <p class="text-gray-600 text-sm">Federal Government Colleges Selection</p>
                    </div>
                </div>
                <div class="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
                    <p class="text-sm text-gray-700"><strong>IMPORTANT:</strong> Fill all entries in <strong>BLOCK letters</strong>. All submissions are <strong>FINAL</strong> and cannot be changed.</p>
                </div>
            </div>
        </div>

        <form action="https://formspree.io/f/xwvzpqab" method="POST" class="bg-white rounded-xl shadow-2xl p-8 space-y-6" id="registrationForm" enctype="multipart/form-data">
            <div class="space-y-6">
                <h2 class="text-2xl font-bold text-dark border-b-2 border-primary pb-3 flex items-center">
                    <i class="fas fa-user mr-3 text-primary"></i>Personal Information
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div><input type="text" name="surname" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Surname *" required></div>
                    <div><input type="text" name="firstName" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="First Name *" required></div>
                    <div><input type="text" name="middleName" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Middle Name"></div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><input type="date" name="dateOfBirth" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" required></div>
                    <div class="flex gap-4 items-center">
                        <span class="text-gray-600 font-medium">Gender:</span>
                        <label class="flex items-center"><input type="radio" name="gender" value="MALE" required class="mr-1"> MALE</label>
                        <label class="flex items-center"><input type="radio" name="gender" value="FEMALE" required class="mr-1"> FEMALE</label>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><input type="text" name="disability" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Disability (Optional)"></div>
                    <div><input type="text" name="nin" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="NIN *" required></div>
                </div>
                <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700">Passport Photo *</label>
                    <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <input type="file" name="passportPhoto" accept="image/jpeg,image/png,image/jpg" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" id="passportInput" onchange="previewPassport(this)">
                        <p class="text-xs text-gray-500 mt-1">JPEG/PNG only, max 5MB</p>
                    </div>
                    <div id="passportPreview" class="mt-2 flex justify-center"></div>
                </div>
            </div>

            <div class="space-y-4">
                <h2 class="text-2xl font-bold text-dark border-b-2 border-primary pb-3 flex items-center">
                    <i class="fas fa-map-marker-alt mr-3 text-primary"></i>Origin Information
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select name="stateOfOrigin" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" required id="stateOfOrigin"><option value="">State of Origin *</option></select>
                    <select name="lgaOfOrigin" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" required id="lgaOfOrigin"><option value="">LGA of Origin *</option></select>
                </div>
            </div>

            <div class="space-y-4">
                <h2 class="text-2xl font-bold text-dark border-b-2 border-primary pb-3 flex items-center">
                    <i class="fas fa-home mr-3 text-primary"></i>Residence Information
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select name="stateOfResidence" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" required id="stateOfResidence"><option value="">State of Residence *</option></select>
                    <select name="lgaOfResidence" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" required id="lgaOfResidence"><option value="">LGA of Residence *</option></select>
                </div>
            </div>

            <div class="space-y-4">
                <h2 class="text-2xl font-bold text-dark border-b-2 border-primary pb-3 flex items-center">
                    <i class="fas fa-phone mr-3 text-primary"></i>Contact Information
                </h2>
                <div><input type="text" name="parentsName" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Parent's Name *" required></div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><input type="tel" name="phoneNumber" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Phone Number *" required></div>
                    <div><input type="email" name="email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Email *" required></div>
                </div>
            </div>

            <div class="space-y-4">
                <h2 class="text-2xl font-bold text-dark border-b-2 border-primary pb-3 flex items-center">
                    <i class="fas fa-graduation-cap mr-3 text-primary"></i>School Selections
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select name="northEast" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" required id="northEast"><option value="">North East *</option></select>
                    <select name="northCentral" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" required id="northCentral"><option value="">North Central *</option></select>
                    <select name="northWest" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" required id="northWest"><option value="">North West *</option></select>
                    <select name="southEast" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" required id="southEast"><option value="">South East *</option></select>
                    <select name="southWest" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" required id="southWest"><option value="">South West *</option></select>
                    <select name="southSouth" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" required id="southSouth"><option value="">South South *</option></select>
                </div>
            </div>

            <button type="submit" class="w-full px-6 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-dark transition-all duration-300 shadow-lg hover:shadow-xl">
                <i class="fas fa-paper-plane mr-2"></i>Submit Registration
            </button>
        </form>

        <div class="mt-8 text-center">
            <p class="text-gray-600 text-sm">
                <span class="font-semibold" style="color: #FF2E2E;">POWERED BY BIG MACHINE ENT.</span>
            </p>
            <p class="text-gray-500 text-xs mt-1">MEDELY Schools NCEE Registration 2026</p>
        </div>
    </div>
</div>