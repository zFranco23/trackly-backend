import {
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(200)
  description?: string;

  @IsOptional()
  @IsString()
  @IsUrl(undefined, {
    message: 'Repository URL must be a valid URL',
  })
  @MaxLength(100)
  repository?: string;
}
