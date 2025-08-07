package kh.springboot.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/**")					// 맵핑 URL 설정 ex. addResourceHandler("/image/**") /image/어쩌고
				.addResourceLocations("file:///c:/uploadFiles/", "classpath:/static");	// 정적 리소스 위치
	}
	
}
