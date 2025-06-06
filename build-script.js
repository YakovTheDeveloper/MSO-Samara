#!/usr/bin/env node

import { execa } from 'execa';
import fs from 'fs-extra';
import path from 'path';

async function main() {
    const buildDir = 'dist';
    const deployRoot = 'deploy';
    const subDirs = ['cd1', 'cd2', 'forest', 'cd2vertical'];

    // Step 0: Clean deploy folder
    console.log('🧹 Cleaning deploy directory...');
    try {
        await fs.remove(deployRoot);
        console.log('✅ Deploy folder cleared.');
    } catch (err) {
        console.error(`❌ Failed to clear deploy folder: ${err.message}`);
        return;
    }

    // Step 1: Build the project
    console.log('🔨 Building Vue 3 project...');
    await execa('npm', ['run', 'build-only'], { stdio: 'inherit' });

    // Step 2: Copy entire dist/ to deploy/
    try {
        await fs.ensureDir(deployRoot);
        await fs.copy(buildDir, deployRoot, { overwrite: true });
        const htaccessSrc = '.htaccess';
        const htaccessDest = path.join(deployRoot, '.htaccess');

        await fs.copy(htaccessSrc, htaccessDest);
        console.log(`📁 Copied full build to ${deployRoot}`);
    } catch (err) {
        console.error(`❌ Failed to copy dist to ${deployRoot}: ${err.message}`);
    }

    // Step 3: Copy only index.html and .htaccess to subfolders
    const filesToCopy = [
        { src: path.join(buildDir, 'index.html'), name: 'index.html' },
        { src: '.htaccess', name: '.htaccess' },
    ];

    for (const dir of subDirs) {
        const target = path.join(deployRoot, dir);
        for (const file of filesToCopy) {
            const dest = path.join(target, file.name);
            try {
                await fs.ensureDir(path.dirname(dest));
                await fs.copy(file.src, dest);
                console.log(`✅ Copied ${file.name} to ${target}`);
            } catch (err) {
                console.warn(`⚠️ Failed to copy ${file.name} to ${target}: ${err.message}`);
            }
        }
    }

    console.log('🚀 Build and deployment prep complete!');
}

main().catch(err => {
    console.error('❌ Error:', err.message);
});
