package dev.aliaref.RnWallpapaerManager

import android.app.WallpaperManager
import android.content.Context
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.net.Uri
import android.os.Build
import androidx.core.content.FileProvider
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.Promise
import java.io.File
import java.io.FileOutputStream
import java.io.InputStream
import java.net.URL

class RnWallpaperManagerModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("RnWallpaperManager")

    // Defines event names that the module can send to JavaScript.
    Events("onWallpaperChanged")

    // Function to set wallpaper from URL
    AsyncFunction("setWallpaperFromUrl") { url: String, wallpaperType: String, promise: Promise ->
      try {
        val context = appContext.reactContext ?: throw Exception("React context not available")
        val wallpaperManager = WallpaperManager.getInstance(context)
        
        // Download image from URL
        val bitmap = downloadImageFromUrl(url)
        
        // Set wallpaper based on type
        when (wallpaperType.lowercase()) {
          "home" -> wallpaperManager.setBitmap(bitmap, null, true, WallpaperManager.FLAG_SYSTEM)
          "lock" -> wallpaperManager.setBitmap(bitmap, null, true, WallpaperManager.FLAG_LOCK)
          "both" -> wallpaperManager.setBitmap(bitmap)
          else -> wallpaperManager.setBitmap(bitmap) // Default to both
        }
        
        sendEvent("onWallpaperChanged", mapOf(
          "success" to true,
          "url" to url,
          "type" to wallpaperType
        ))
        
        promise.resolve(mapOf(
          "success" to true,
          "message" to "Wallpaper set successfully"
        ))
      } catch (e: Exception) {
        promise.reject("WALLPAPER_ERROR", "Failed to set wallpaper: ${e.message}", e)
      }
    }

    // Function to set wallpaper from local file path
    AsyncFunction("setWallpaperFromFile") { filePath: String, wallpaperType: String, promise: Promise ->
      try {
        val context = appContext.reactContext ?: throw Exception("React context not available")
        val wallpaperManager = WallpaperManager.getInstance(context)
        
        val bitmap = BitmapFactory.decodeFile(filePath)
        if (bitmap == null) {
          throw Exception("Could not decode image from file: $filePath")
        }
        
        // Set wallpaper based on type
        when (wallpaperType.lowercase()) {
          "home" -> wallpaperManager.setBitmap(bitmap, null, true, WallpaperManager.FLAG_SYSTEM)
          "lock" -> wallpaperManager.setBitmap(bitmap, null, true, WallpaperManager.FLAG_LOCK)
          "both" -> wallpaperManager.setBitmap(bitmap)
          else -> wallpaperManager.setBitmap(bitmap) // Default to both
        }
        
        sendEvent("onWallpaperChanged", mapOf(
          "success" to true,
          "filePath" to filePath,
          "type" to wallpaperType
        ))
        
        promise.resolve(mapOf(
          "success" to true,
          "message" to "Wallpaper set successfully"
        ))
      } catch (e: Exception) {
        promise.reject("WALLPAPER_ERROR", "Failed to set wallpaper: ${e.message}", e)
      }
    }

    // Function to check if wallpaper setting is supported
    Function("isWallpaperSettingSupported") {
      try {
        val context = appContext.reactContext ?: throw Exception("React context not available")
        val wallpaperManager = WallpaperManager.getInstance(context)
        
        // Check if the device supports wallpaper setting
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
          wallpaperManager.isSetWallpaperAllowed
        } else {
          true // Older versions generally support wallpaper setting
        }
      } catch (e: Exception) {
        false
      }
    }

    // Function to get current wallpaper info
    AsyncFunction("getCurrentWallpaperInfo") { promise: Promise ->
      try {
        val context = appContext.reactContext ?: throw Exception("React context not available")
        val wallpaperManager = WallpaperManager.getInstance(context)
        
        val result = mutableMapOf<String, Any>()
        
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
          result["homeScreenSupported"] = wallpaperManager.isSetWallpaperAllowed
          result["lockScreenSupported"] = wallpaperManager.isSetWallpaperAllowed
        } else {
          result["homeScreenSupported"] = true
          result["lockScreenSupported"] = false
        }
        
        promise.resolve(result)
      } catch (e: Exception) {
        promise.reject("WALLPAPER_ERROR", "Failed to get wallpaper info: ${e.message}", e)
      }
    }
  }

  private fun downloadImageFromUrl(urlString: String): Bitmap {
    val url = URL(urlString)
    val inputStream: InputStream = url.openStream()
    val bitmap = BitmapFactory.decodeStream(inputStream)
    inputStream.close()
    
    if (bitmap == null) {
      throw Exception("Could not download or decode image from URL: $urlString")
    }
    
    return bitmap
  }
}
